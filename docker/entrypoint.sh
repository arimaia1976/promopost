#!/bin/sh
# Ao subir: aplica a estrutura do banco, importa o conteúdo inicial se o banco estiver vazio e inicia o site.
set -e
echo "[promopost] aplicando migrações do banco..."
npm run cms:migrate
echo "[promopost] importação inicial (só se o banco estiver vazio)..."
npm run cms:seed
echo "[promopost] iniciando o site na porta 3000"
exec npx next start -p 3000
