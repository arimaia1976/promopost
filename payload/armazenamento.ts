/**
 * Onde ficam as imagens enviadas pelo painel:
 *  - Servidor do cliente (Docker/VPS): disco local, pasta MEDIA_DIR (padrão). Nada a configurar.
 *  - Prévia no Netlify (MEDIA_STORAGE=netlify): Netlify Blobs, porque o disco das funções é temporário.
 *    Imagens importadas pelo seed no build não são gravadas lá (o build não pode gravar) e são
 *    servidas a partir de /images (os mesmos arquivos do site original).
 */
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";
import imagensPublicas from "../content/imagens-publicas.json";

const LOJA = "promopost-media";

const netlifyBlobs: Adapter = () => ({
  name: "netlify-blobs",
  async handleUpload({ file, storageFilePath }) {
    if (process.env.SEED_SEM_ARQUIVOS) return; // seed no build: arquivo já existe em /images
    const { getStore } = await import("@netlify/blobs");
    const loja = getStore({ name: LOJA, consistency: "strong" });
    await loja.set(storageFilePath || file.filename, new Blob([new Uint8Array(file.buffer)]), {
      metadata: { contentType: file.mimeType },
    });
  },
  async handleDelete({ filename, storageFilePath }) {
    const { getStore } = await import("@netlify/blobs");
    await getStore({ name: LOJA, consistency: "strong" }).delete(storageFilePath || filename);
  },
  async staticHandler(req, { params }) {
    const original = () =>
      new Response(null, { status: 307, headers: { Location: `/images/${encodeURIComponent(params.filename)}` } });
    // imagem original do site (importada no seed): não está na loja, vem de /images
    if (params.filename in imagensPublicas) return original();
    const { getStore } = await import("@netlify/blobs");
    const chave = params.prefix ? `${params.prefix}/${params.filename}` : params.filename;
    const item = await getStore({ name: LOJA, consistency: "strong" }).getWithMetadata(chave, { type: "arrayBuffer" });
    if (item === null) return original();
    return new Response(item.data as ArrayBuffer, {
      headers: {
        "Content-Type": String(item.metadata?.contentType ?? "application/octet-stream"),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  },
});

export const armazenamento = cloudStoragePlugin({
  enabled: process.env.MEDIA_STORAGE === "netlify",
  alwaysInsertFields: true, // mesma estrutura de banco em todos os ambientes
  collections: { media: { adapter: netlifyBlobs, disableLocalStorage: true } },
});
