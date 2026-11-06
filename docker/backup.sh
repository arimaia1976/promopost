#!/bin/sh
# Backup do banco (pg_dump) e das imagens do painel. Mantém 14 dias.
set -e
D=$(date +%Y-%m-%d)
pg_dump -h db -U promopost -d promopost -Fc -f /backups/banco-$D.dump
tar -czf /backups/imagens-$D.tar.gz -C /imagens .
find /backups -name 'banco-*.dump' -mtime +14 -delete
find /backups -name 'imagens-*.tar.gz' -mtime +14 -delete
echo "[backup] ok $D"
