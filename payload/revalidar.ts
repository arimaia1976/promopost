import { revalidateTag } from "next/cache";

/** Qualquer alteração no painel atualiza o site na hora (cache do conteúdo). */
export const TAG_CONTEUDO = "conteudo";

export function revalidarSite<T>({ doc }: { doc?: T } = {}) {
  try {
    revalidateTag(TAG_CONTEUDO);
  } catch {
    // fora do Next (ex.: script de importação): nada a revalidar
  }
  return doc;
}
