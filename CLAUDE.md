# PromoPost — instruções do projeto

Réplica **visualmente idêntica** de promopost.com.br (WordPress + Elementor) em Next.js,
com CMS (Payload) e banco depois. O cliente é muito detalhista: nenhuma diferença
visual é aceitável. Toda mudança visual passa pelo teste de regressão (abaixo).

## Fases
- **M1/M2 (agora):** páginas idênticas, conteúdo em `/content`. Prévia na Netlify (grátis, noindex).
- **M3 (feito):** Payload CMS em `/admin`. Fonte única: blocos repetidos são globais
  (Cabeçalho, Rodapé, Apoio, Vitrine, Benefícios, Formulários); cada página é um global.
- **M5:** produção no servidor do cliente com `docker compose` (ver `docs/SERVIDOR.md`).

## CMS (Payload)
- Config: `payload.config.ts`, `payload/collections`, `payload/globals`. Esquema do banco `site`.
- Migrações em `/migrations` (gerar com `npx payload migrate:create nome` após mudar campos).
- `scripts/seed.ts` importa o conteúdo original (só roda com banco vazio em `npm run cms:seed`).
- `payload/sharp-original.ts`: guarda as imagens enviadas sem recomprimir (fidelidade).
- `lib/richtext.ts`: texto do editor → HTML idêntico ao original (estilos e listas da Privacidade).
- Imagens: disco local (`MEDIA_DIR`) no servidor; Netlify Blobs na prévia (`MEDIA_STORAGE=netlify`).
- Alterar conteúdo no painel limpa o cache (`payload/revalidar.ts`); banners agendados entram em até 60 s.

## Stack
- Next.js 15 (App Router) + TypeScript 5. Sem Tailwind, sem jQuery, sem bibliotecas de UI.
- `typescript` fixo na v5 (a v7 quebra o Next 15).

## Como a fidelidade é garantida
- `app/site.css` = **somente as regras de CSS que o site original usa**, extraídas do
  Elementor/plugins (de ~35 arquivos para 1), na ordem original. Gerado por
  `scripts/build-css.mjs`; não editar à mão. Ajustes vão em `app/ajustes.css`.
- Manter os atributos `data-elementor-id` nos wrappers (página, header, footer, cards):
  o CSS do Elementor centraliza blocos por eles.
- Os componentes mantêm a mesma estrutura e as classes do original
  (`elementor-element-<id>` etc.), porque o CSS depende delas. Não "limpar" essas classes.
- Comportamentos refeitos sem jQuery: carrossel (`components/blocks/Carousel.tsx`, mesmos
  pontos de quebra: 1 item <768, 2 itens 768–979, 1 item ≥980) e menu mobile (`NavMenu.tsx`).

## Estrutura
- `content/` dados (banners, anunciantes, home, globais) → viram coleções no Payload.
- `lib/content.ts` única porta de leitura do conteúdo.
- `components/layout` Header, Footer, menus · `components/blocks` seções e cards · `components/icons` SVGs originais.
- `docs/MIGRACAO.md` inventário do que está nas contas do Aristoteles e vai para o cliente (manter atualizado a cada recurso novo).
- `public/images` imagens originais (mesmos arquivos do WordPress) · `public/fonts` Roboto (latin/latin-ext).

## Teste visual (obrigatório antes de publicar)
1. Servir a cópia do site original em `localhost:8080` (pacote em Drive `PROMOPOST/_referencia`).
2. `npm run build && npm start` (porta 3000).
3. `node tests/visual/compare.mjs / [/sobre/ ...]` → capturas e mapas de diferença em
   `tests/visual/output`, em 360/768/1280/1920. Meta: só ruído de reamostragem de imagem (<0,02%).

## Regras
- Mobile first, sem rolagem horizontal; SEO (metadata, h1 único, alt), noindex na prévia.
- Formulários (`components/blocks/ElementorForm.tsx`, campos em `content/formularios.ts`):
  enviam para `app/api/formulario` → e-mail (`lib/email.ts`, SMTP ou Resend por variável de
  ambiente) e/ou planilha via `FORM_WEBHOOK_URL`. Nada fica guardado no site. Ver `.env.example`.
- Conteúdo sempre via props/dados, nunca fixo nos componentes.
