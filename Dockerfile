# Site + painel PromoPost (Next.js + Payload). Uso: ver docs/SERVIDOR.md
FROM node:22-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# o build não acessa o banco (páginas são renderizadas no servidor); valores provisórios
ENV DATABASE_URL=postgres://build:build@localhost:5432/build \
    PAYLOAD_SECRET=build-somente \
    NODE_OPTIONS="--no-deprecation --max-old-space-size=4096"
RUN npm run build

FROM base AS run
ENV NODE_ENV=production \
    NODE_OPTIONS="--no-deprecation" \
    MEDIA_DIR=/app/media
COPY --from=build /app ./
RUN mkdir -p /app/media && chown -R node:node /app/media /app/.next
USER node
EXPOSE 3000
ENTRYPOINT ["sh", "docker/entrypoint.sh"]
