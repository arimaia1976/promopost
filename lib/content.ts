/**
 * Única porta de leitura de conteúdo do site: lê do CMS (Payload, Local API).
 * Cache com a tag "conteudo": qualquer alteração no painel limpa o cache na hora
 * (payload/revalidar.ts); o tempo máximo garante a entrada/saída agendada de banners.
 */
import "server-only";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { TAG_CONTEUDO } from "@/payload/revalidar";
import { richTextParaHtml } from "./richtext";
import type {
  Anunciante,
  Banner,
  Formularios,
  Globals,
  Home,
  Imagem,
  MenuItem,
  Pagina,
} from "@/types/content";

const CACHE = { tags: [TAG_CONTEUDO], revalidate: 60 };
const cms = () => getPayload({ config });

type Midia =
  | {
      url?: string | null;
      alt?: string | null;
      width?: number | null;
      height?: number | null;
    }
  | number
  | null
  | undefined;

function img(m: Midia): Imagem {
  if (!m || typeof m === "number") return { src: "", alt: "" };
  return {
    src: m.url ?? "",
    alt: m.alt ?? "",
    largura: m.width ?? undefined,
    altura: m.height ?? undefined,
  };
}

const links = (l?: { label: string; href: string }[] | null): MenuItem[] =>
  (l ?? []).map(({ label, href }) => ({ label, href }));


export const getGlobals = unstable_cache(
  async (): Promise<Globals> => {
    const p = await cms();
    const [c, r] = await Promise.all([
      p.findGlobal({ slug: "cabecalho", depth: 1 }),
      p.findGlobal({ slug: "rodape", depth: 1 }),
    ]);
    return {
      logo: img(c.logo),
      logoRodape: img(r.logo),
      logoRodapeCelular: img(r.logoCelular),
      qrCode: img(r.qrCode),
      chamadaInstagram: r.chamadaInstagram,
      instagram: r.instagram,
      copyright: r.copyright,
      menuPrincipal: links(c.menuDesktop),
      menuMobile: links(c.menuCelular),
      menuRodape: links(r.menu),
      botoesTopo: links(c.botoes),
    };
  },
  ["globals"],
  CACHE,
);

export const getHome = unstable_cache(
  async (): Promise<Home> => {
    const p = await cms();
    const [h, v, b, a] = await Promise.all([
      p.findGlobal({ slug: "home", depth: 1 }),
      p.findGlobal({ slug: "vitrine" }),
      p.findGlobal({ slug: "beneficios" }),
      p.findGlobal({ slug: "apoio", depth: 0 }),
    ]);
    const i = img(h.imagemBeneficios);
    return {
      meta: { title: h.seo.titulo, description: h.seo.descricao ?? "" },
      tituloPrincipal: h.tituloPrincipal,
      tituloDestaque: v.tituloDestaque,
      tituloOfertas: v.tituloOfertas,
      tituloApoio: a.titulo,
      imagemBeneficios: {
        src: i.src,
        srcSet: "",
        largura: i.largura ?? 677,
        altura: i.altura ?? 479,
      },
      beneficios: [b.fortaleca, b.venda, b.alcance, b.redes],
    };
  },
  ["home"],
  CACHE,
);

function banner(b: {
  imagem: Midia;
  link?: string | null;
  novaAba?: boolean | null;
}): Banner {
  const i = img(b.imagem);
  return {
    imagem: i.src,
    alt: i.alt,
    largura: i.largura ?? 1920,
    altura: i.altura ?? 619,
    link: b.link || null,
    novaAba: !!b.novaAba,
  };
}

export const getBanners = unstable_cache(
  async (local: "topo" | "apoio"): Promise<Banner[]> => {
    const p = await cms();
    if (local === "apoio") {
      const a = await p.findGlobal({ slug: "apoio", depth: 1 });
      return (a.banners ?? []).map(banner);
    }
    const agora = new Date().toISOString();
    const r = await p.find({
      collection: "banners",
      depth: 1,
      limit: 50,
      sort: "ordem",
      where: {
        and: [
          { ativo: { equals: true } },
          {
            or: [
              { inicio: { exists: false } },
              { inicio: { less_than_equal: agora } },
            ],
          },
          {
            or: [{ fim: { exists: false } }, { fim: { greater_than: agora } }],
          },
        ],
      },
    });
    return r.docs.map(banner);
  },
  ["banners"],
  CACHE,
);

export const getAnunciantes = unstable_cache(
  async (destaque: boolean): Promise<Anunciante[]> => {
    const p = await cms();
    const r = await p.find({
      collection: "anunciantes",
      depth: 1,
      limit: 100,
      sort: "ordem",
      where: {
        and: [
          { ativo: { equals: true } },
          { secao: { equals: destaque ? "destaque" : "ofertas" } },
        ],
      },
    });
    return r.docs.map((a) => {
      const i = img(a.imagem);
      return {
        id: a.id as number,
        nome: a.nome,
        categoria: a.categoria,
        descricao: a.descricao,
        imagem: i.src,
        imagemAlt: i.alt,
        link: a.link,
        destaque,
        ordem: a.ordem ?? 0,
      };
    });
  },
  ["anunciantes"],
  CACHE,
);

type SlugPagina =
  "sobre" | "anuncie" | "contato" | "cadastro" | "privacidade" | "termos";

export const getPagina = unstable_cache(
  async (slug: SlugPagina): Promise<Pagina> => {
    const p = await cms();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g: any = await p.findGlobal({ slug, depth: 1 });
    return {
      seo: { titulo: g.seo?.titulo ?? "", descricao: g.seo?.descricao },
      banner: g.banner ? img(g.banner) : undefined,
      titulo: g.titulo,
      subtitulo: g.subtitulo ?? undefined,
      html: g.texto ? richTextParaHtml(g.texto, { paragrafosEmListas: slug === "privacidade" }) : undefined,
      blocos: g.blocos?.map((b: { titulo: string; texto: string }) => ({
        titulo: b.titulo,
        texto: b.texto,
      })),
      botao: g.botao?.label
        ? { label: g.botao.label, href: g.botao.href }
        : undefined,
    };
  },
  ["pagina"],
  CACHE,
);

export const getFormularios = unstable_cache(
  async (): Promise<Formularios> => {
    const p = await cms();
    const f = await p.findGlobal({ slug: "formularios" });
    return {
      contato: f.contato,
      cadastro: f.cadastro,
      assuntos: (f.assuntos ?? []).map((a) => a.opcao),
      textoNovidades: f.textoNovidades,
    };
  },
  ["formularios"],
  CACHE,
);
