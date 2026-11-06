# Migração para a estrutura do cliente

Tudo o que hoje está em contas do Aristoteles e precisa ir para o cliente quando
ele aprovar. **Só apagar das contas do Aristoteles depois do item "Conferência final".**

Atualizado a cada etapa do projeto.

## Inventário (onde está hoje → para onde vai)

| # | Item | Hoje (Aristoteles) | Destino (cliente) | Como migrar |
|---|------|--------------------|-------------------|-------------|
| 1 | Código do site | GitHub `arimaia1976/promopost` | GitHub do cliente (ou só no servidor) | *Transfer ownership* no GitHub, ou `git clone --mirror` + push no repo novo |
| 2 | Prévia online | Netlify `promopost-previa` (time "Persona") | Não migra — some após a virada | Apagar o projeto no Netlify **depois** da virada do domínio |
| 3 | Variáveis de ambiente | Netlify (EMAIL_*, FORM_WEBHOOK_URL, RESEND_API_KEY) | Arquivo `.env` no servidor do cliente | Recriar a partir de `.env.example` com os dados do cliente |
| 4 | Envio de e-mail dos formulários | Resend (conta arimaia1976), remetente de teste `onboarding@resend.dev`, destino arimaia1976@gmail.com | SMTP do e-mail do cliente **ou** Resend do cliente com domínio promopost.com.br verificado | Trocar `EMAIL_PROVIDER`, credenciais, `EMAIL_FROM` e `EMAIL_TO`; registros DNS (SPF/DKIM) no domínio do cliente |
| 5 | Planilha de envios | Google Drive arimaia1976 — "PromoPost – Envios do site" | Google Drive do cliente | Transferir a propriedade da planilha (Compartilhar → transferir) ou fazer cópia na conta dele |
| 6 | Automação planilha | Make (conta do Aristoteles): webhook `PromoPost – formulários do site` + cenário | Make do cliente **ou** substituir por envio direto do site | Exportar o blueprint do cenário e importar na conta dele; atualizar `FORM_WEBHOOK_URL` |
| 7 | Banco de dados do CMS | Supabase (org "Philos"), projeto `promopost-previa`, esquema `site`, usuário `promopost_site` | Postgres no servidor do cliente (Docker) | Ver `docs/SERVIDOR.md` → "Trazer o conteúdo editado na prévia" |
| 8 | Imagens enviadas pelo painel | Netlify Blobs (loja `promopost-media`) + originais em `public/images` | Volume `imagens` no servidor | Ver `docs/SERVIDOR.md` |
| 9 | Usuários do painel | Usuário admin criado na prévia | Usuário admin do cliente | Criar no primeiro acesso a `/admin` no servidor; remover o do Aristoteles se combinado |
| 10 | Domínio promopost.com.br | DNS atual (HostGator/WordPress) | Apontar para o servidor novo | Mudar registro A/CNAME na virada; manter o WordPress até confirmar |
| 11 | Material de referência | Google Drive `JOBS/PROJETOS/PROMOPOST/_referencia` (zips do site antigo) | Não migra (uso interno) | Guardar como histórico ou apagar após a entrega |
| 12 | Analytics | Google Analytics G-HFPV6DLTKY (do site antigo) | Mesmo ID, se o cliente quiser manter | Confirmar com o cliente e adicionar ao site novo |

## Ordem recomendada na virada
1. Servidor do cliente pronto (Docker) e `.env` preenchido com dados dele.
2. Restaurar banco e imagens do CMS (itens 7 e 8) e rodar o teste visual.
3. Formulários: testar envio para o e-mail do cliente e a planilha dele (itens 4–6).
4. Apontar o domínio (item 10).
5. **Conferência final** (abaixo). Só então apagar das contas do Aristoteles.

## Conferência final (antes de apagar qualquer coisa)
- [ ] Site no domínio do cliente, idêntico à prévia aprovada (teste visual ok).
- [ ] Painel do CMS acessível com o usuário do cliente; troca de banner testada.
- [ ] Formulário de Contato e de Cadastro chegam no e-mail **do cliente**.
- [ ] Linha nova aparece na planilha **do cliente**.
- [ ] Backup automático do banco rodando no servidor do cliente.
- [ ] Código em repositório/servidor do cliente.

## Depois da conferência, pode apagar
GitHub `arimaia1976/promopost` · Netlify `promopost-previa` (e a loja Blobs) · projeto Supabase `promopost-previa` · chave do Resend · cenário e webhook do Make ·
planilha (se copiada) · pasta `_referencia` no Drive (opcional).
