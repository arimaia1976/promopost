# PromoPost — instruções do projeto

Réplica **visualmente idêntica** de promopost.com.br (WordPress + Elementor) em Next.js,
com CMS (Payload) e banco depois. O cliente é muito detalhista: nenhuma diferença
visual é aceitável. Toda mudança visual passa pelo teste de regressão (abaixo).

## Fases
- **M1/M2 (agora):** páginas idênticas, conteúdo em `/content`. Prévia na Netlify (grátis, noindex).
- **M3:** Payload CMS (coleções Banners e Anunciantes, globais). Só `lib/content.ts` muda.
- **M5:** produção no VPS do cliente (Node + Postgres em Docker).

## Stack
- Next.js 15 (App Router) + TypeScript 5. Sem Tailwind, sem jQuery, sem bibliotecas de UI.
- `typescript` fixo na v5 (a v7 quebra o Next 15).

## Como a fidelidade é garantida
- `app/site.css` = **somente as regras de CSS que o site original usa**, extraídas do
  Elementor/plugins (de ~35 arquivos para 1). Não editar à mão; ajustes vão em `app/ajustes.css`.
- Os componentes mantêm a mesma estrutura e as classes do original
  (`elementor-element-<id>` etc.), porque o CSS depende delas. Não "limpar" essas classes.
- Comportamentos refeitos sem jQuery: carrossel (`components/blocks/Carousel.tsx`, mesmos
  pontos de quebra: 1 item <768, 2 itens 768–979, 1 item ≥980) e menu mobile (`NavMenu.tsx`).

## Estrutura
- `content/` dados (banners, anunciantes, home, globais) → viram coleções no Payload.
- `lib/content.ts` única porta de leitura do conteúdo.
- `components/layout` Header, Footer, menus · `components/blocks` seções e cards · `components/icons` SVGs originais.
- `public/images` imagens originais (mesmos arquivos do WordPress) · `public/fonts` Roboto (latin/latin-ext).

## Teste visual (obrigatório antes de publicar)
1. Servir a cópia do site original em `localhost:8080` (pacote em Drive `PROMOPOST/_referencia`).
2. `npm run build && npm start` (porta 3000).
3. `node tests/visual/compare.mjs / [/sobre/ ...]` → capturas e mapas de diferença em
   `tests/visual/output`, em 360/768/1280/1920. Meta: só ruído de reamostragem de imagem (<0,02%).

## Regras
- Mobile first, sem rolagem horizontal; SEO (metadata, h1 único, alt), noindex na prévia.
- Formulários: e-mail do cliente e/ou planilha; provedor de e-mail configurável por variável de ambiente.
- Conteúdo sempre via props/dados, nunca fixo nos componentes.
