import { sql } from "@payloadcms/db-postgres";
import type { PostgresAdapter } from "@payloadcms/db-postgres";
import { APIError, type CollectionBeforeDeleteHook } from "payload";

/** Nome de cada lugar do painel que usa imagens (tabela do banco → texto para o usuário). */
const LUGARES: Record<string, string> = {
  banners: "Banners do topo",
  anunciantes: "Anunciantes",
  apoio_banners: "Apoio Institucional",
  cabecalho: "Cabeçalho",
  rodape: "Rodapé",
  home: "Home",
  sobre: "Sobre",
  anuncie: "Anuncie",
  contato: "Contato",
  cadastro: "Cadastro",
};

/**
 * Impede excluir uma imagem em uso. Sem isso o banco recusa a exclusão (os campos de imagem
 * são obrigatórios) e o painel mostra só um erro genérico. A lista de tabelas vem do próprio
 * banco, então campos de imagem novos entram sozinhos.
 */
export const bloquearImagemEmUso: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const adapter = req.payload.db as unknown as PostgresAdapter;
  const transacao = await req.transactionID;
  const db = (transacao ? adapter.sessions?.[transacao]?.db : undefined) ?? adapter.drizzle;

  const { rows: referencias } = await db.execute<{ tabela: string; coluna: string }>(sql`
    select t.relname as tabela, a.attname as coluna
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any(c.conkey)
    where c.contype = 'f' and c.confrelid = 'site.media'::regclass
      and t.relname not like 'payload_%'
  `);
  if (referencias.length === 0) return;

  const consultas = referencias.map(
    ({ tabela, coluna }) =>
      `select '${tabela}' as tabela from "site"."${tabela}" where "${coluna}" = ${Number(id)}`,
  );
  const { rows: usos } = await db.execute<{ tabela: string }>(sql.raw(consultas.join(" union all ")));
  if (usos.length === 0) return;

  const lugares = [...new Set(usos.map((u) => LUGARES[u.tabela] ?? u.tabela))].join(", ");
  throw new APIError(
    `Esta imagem não pode ser excluída porque está em uso em: ${lugares}. Troque a imagem nesse lugar e tente de novo.`,
    400,
    undefined,
    true,
  );
};
