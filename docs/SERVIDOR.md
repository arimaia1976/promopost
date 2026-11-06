# Colocar o site no servidor do cliente

Funciona em qualquer VPS Linux (HostGator VPS, DigitalOcean, Hostinger, AWS…) com **2 GB de RAM** ou mais.
Tudo roda em Docker: site + painel, banco Postgres, HTTPS automático e backup diário.

## 1. Preparar o servidor (uma vez)
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
git clone <repositório do cliente> promopost && cd promopost
cp .env.example .env   # preencher: DOMINIO, DB_PASSWORD, PAYLOAD_SECRET, e-mail, webhook
```

## 2. Subir
```bash
docker compose up -d --build
```
Na primeira subida o site cria a estrutura do banco e importa todo o conteúdo inicial
(textos, banners, anunciantes, imagens). Nas próximas, só aplica migrações novas.

## 3. Domínio
Apontar o registro **A** de `promopost.com.br` (e `www`) para o IP do servidor.
O HTTPS é emitido sozinho pelo Caddy assim que o DNS propagar.

## 4. Primeiro acesso ao painel
`https://promopost.com.br/admin` → criar o usuário administrador (só aparece enquanto não houver usuários).

## Rotina
| O quê | Como |
|---|---|
| Atualizar o site | `git pull && docker compose up -d --build` |
| Ver logs | `docker compose logs -f site` |
| Backups | pasta `./backups` (banco `.dump` + imagens `.tar.gz`, 14 dias). Copiar para fora do servidor periodicamente. |
| Restaurar banco | `docker compose exec -T db pg_restore -U promopost -d promopost --clean < backups/banco-AAAA-MM-DD.dump` |
| Restaurar imagens | `docker run --rm -v promopost_imagens:/m -v $PWD/backups:/b alpine tar -xzf /b/imagens-AAAA-MM-DD.tar.gz -C /m` |

## Trazer o conteúdo editado na prévia (se houver)
Se o cliente já tiver editado conteúdo na prévia, em vez da importação inicial:
1. Exportar o esquema `site` do banco da prévia: `pg_dump "<URL do banco da prévia>" -n site -Fc -f previa.dump`
2. Restaurar no servidor (com o site parado): `docker compose exec -T db pg_restore -U promopost -d promopost --clean --if-exists < previa.dump`
3. Imagens enviadas pela prévia: baixar do Netlify Blobs (loja `promopost-media`, `netlify blobs:list/get`) para o volume `imagens`.
