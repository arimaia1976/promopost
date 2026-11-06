import type { Metadata } from "next";
import type { PropsPagina } from "@/components/pages/tipos";
import {
  getAnunciantes,
  getBanners,
  getFormularios,
  getHome,
  getPagina,
} from "./content";
import { getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { TAG_CONTEUDO } from "@/payload/revalidar";

type Slug =
  "sobre" | "anuncie" | "contato" | "cadastro" | "privacidade" | "termos";

const getBeneficios = unstable_cache(
  async () => {
    const b = await (
      await getPayload({ config })
    ).findGlobal({ slug: "beneficios" });
    return {
      fortaleca: b.fortaleca,
      venda: b.venda,
      alcance: b.alcance,
      redes: b.redes,
    };
  },
  ["beneficios"],
  { tags: [TAG_CONTEUDO], revalidate: 60 },
);

/** Carrega tudo que uma página interna precisa (página + blocos compartilhados). */
export async function carregarPagina(slug: Slug): Promise<PropsPagina> {
  const [p, apoio, destaque, beneficios, home, formularios] = await Promise.all(
    [
      getPagina(slug),
      getBanners("apoio"),
      slug === "anuncie" ? getAnunciantes(true) : Promise.resolve([]),
      getBeneficios(),
      getHome(),
      getFormularios(),
    ],
  );
  return {
    p,
    apoio,
    destaque,
    beneficios,
    tituloApoio: home.tituloApoio,
    tituloDestaque: home.tituloDestaque,
    formularios,
  };
}

export async function metadataPagina(
  slug: Slug,
  caminho: string,
): Promise<Metadata> {
  const p = await getPagina(slug);
  return {
    title: p.seo.titulo,
    description: p.seo.descricao ?? undefined,
    alternates: { canonical: caminho },
  };
}
