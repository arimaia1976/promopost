import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "path";
import { buildConfig } from "payload";
import sharp from "./payload/sharp-original";
import { fileURLToPath } from "url";
import { collections } from "./payload/collections";
import { globals } from "./payload/globals";
import { armazenamento } from "./payload/armazenamento";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.SITE_URL_PUBLICA || undefined,
  admin: {
    user: "users",
    meta: { titleSuffix: " – Painel PromoPost" },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { pt }, fallbackLanguage: "pt" },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "types/payload-types.ts") },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      // Mínimo 5: com 2 conexões, excluir e editar travam (o Payload abre uma transação e ainda
      // precisa de outras conexões ao mesmo tempo). Servidor: padrão 10.
      max: Math.max(5, Number(process.env.DB_POOL_MAX || 10)),
      // se faltar conexão, responde com erro em vez de ficar travado até o tempo limite
      connectionTimeoutMillis: 10000,
    },
    // esquema próprio (não usa o "public"): isola o site e é igual em todos os ambientes
    schemaName: "site",
    // estrutura do banco versionada em /migrations (necessário para produção)
    migrationDir: path.resolve(dirname, "migrations"),
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
  plugins: [armazenamento],
  telemetry: false,
});
