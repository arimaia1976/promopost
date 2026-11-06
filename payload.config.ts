import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { collections } from "./payload/collections";
import { globals } from "./payload/globals";

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
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // estrutura do banco versionada em /migrations (necessário para produção)
    migrationDir: path.resolve(dirname, "migrations"),
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
  telemetry: false,
});
