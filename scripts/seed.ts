/**
 * Importa todo o conteúdo atual (pasta /content + imagens de /public/images) para o CMS.
 * Uso: npx payload run scripts/seed.ts   (banco vazio, já migrado)
 * Pode ser rodado de novo: apaga e recria banners, anunciantes e imagens importadas.
 */
import {
  convertHTMLToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";
import { anunciantes } from "../content/anunciantes";
import { bannersApoio, bannersTopo } from "../content/banners";
import { formularios } from "../content/formularios";
import { globals as g } from "../content/globals";
import { home } from "../content/home";
import { privacidade, termos } from "../content/legais";
import ricos from "../content/ricos.json";

const payload = await getPayload({ config });
const editorConfig = await editorConfigFactory.default({
  config: payload.config,
});
const rico = (html: string) =>
  convertHTMLToLexical({ editorConfig, html, JSDOM });

// ── imagens ──
await payload.delete({ collection: "media", where: { id: { exists: true } } });
const midia = new Map<string, number>();
async function img(src: string, alt: string) {
  const nome = path.basename(src);
  if (midia.has(nome)) return midia.get(nome)!;
  const doc = await payload.create({
    collection: "media",
    data: { alt: alt || "PromoPost" },
    filePath: path.resolve("public/images", nome),
  });
  midia.set(nome, doc.id as number);
  return doc.id as number;
}

// ── banners do topo ──
await payload.delete({
  collection: "banners",
  where: { id: { exists: true } },
});
for (const [i, b] of bannersTopo.entries()) {
  await payload.create({
    collection: "banners",
    data: {
      nome: b.alt,
      imagem: await img(b.imagem, b.alt),
      link: b.link,
      novaAba: b.novaAba,
      ativo: true,
      ordem: (i + 1) * 10,
    },
  });
}

// ── anunciantes ──
await payload.delete({
  collection: "anunciantes",
  where: { id: { exists: true } },
});
for (const a of anunciantes) {
  await payload.create({
    collection: "anunciantes",
    data: {
      nome: a.nome,
      categoria: a.categoria,
      descricao: a.descricao,
      imagem: await img(a.imagem, a.imagemAlt),
      link: a.link,
      secao: a.destaque ? "destaque" : "ofertas",
      ativo: true,
      ordem: a.ordem * 10,
    },
  });
}

// ── compartilhado ──
const links = (l: { label: string; href: string }[]) =>
  l.map(({ label, href }) => ({ label, href }));
await payload.updateGlobal({
  slug: "cabecalho",
  data: {
    logo: await img(
      "/images/Promopost_logo_Hor_neg.svg",
      "PromoPost Alphaville",
    ),
    menuDesktop: links(g.menuPrincipal),
    menuCelular: links(g.menuMobile),
    botoes: links(g.botoesTopo),
  },
});
await payload.updateGlobal({
  slug: "rodape",
  data: {
    logo: await img("/images/PP_Logo_Vermelho.svg", "PromoPost"),
    logoCelular: await img("/images/PromoPost_Color_Grad-1.svg", "PromoPost"),
    menu: links(g.menuRodape),
    instagram: g.instagram,
    qrCode: await img(
      "/images/qr_PP-copy.webp",
      "QR Code do Instagram da PromoPost",
    ),
    chamadaInstagram: "Segue a Gente",
    copyright: g.copyright,
  },
});
await payload.updateGlobal({
  slug: "apoio",
  data: {
    titulo: home.tituloApoio,
    banners: await Promise.all(
      bannersApoio.map(async (b) => ({
        imagem: await img(b.imagem, b.alt),
        link: b.link,
        novaAba: b.novaAba,
      })),
    ),
  },
});
await payload.updateGlobal({
  slug: "vitrine",
  data: {
    tituloDestaque: home.tituloDestaque,
    tituloOfertas: home.tituloOfertas,
  },
});
const [fortaleca, venda, alcance, redes] = home.beneficios;
await payload.updateGlobal({
  slug: "beneficios",
  data: { fortaleca, venda, alcance, redes },
});
const form = (f: (typeof formularios)["contato"]) => ({
  assunto: "Contato via site",
  botao: f.botao,
  sucesso: f.sucesso,
  erro: f.erro,
});
await payload.updateGlobal({
  slug: "formularios",
  data: {
    contato: form(formularios.contato),
    assuntos: (
      formularios.contato.campos.find((c) => c.nome === "assunto")?.opcoes ?? []
    ).map((opcao) => ({ opcao })),
    cadastro: {
      ...form(formularios.cadastro),
      assunto: "Contato via site (Cadastro)",
    },
    textoNovidades: formularios.cadastro.campos.find(
      (c) => c.tipo === "checkbox",
    )!.rotulo,
  },
});

// ── páginas ──
await payload.updateGlobal({
  slug: "home",
  data: {
    seo: home.meta.title
      ? { titulo: home.meta.title, descricao: home.meta.description }
      : undefined,
    tituloPrincipal: home.tituloPrincipal,
    imagemBeneficios: await img(
      home.imagemBeneficios.src,
      "Promoções PromoPost",
    ),
  },
});
await payload.updateGlobal({
  slug: "sobre",
  data: {
    seo: {
      titulo: "Sobre – PromoPost",
      descricao:
        "Conheça a PromoPost Alphaville: as melhores promoções de Alphaville e região para consumidores e anunciantes.",
    },
    banner: await img(
      "/images/02.produto_1400x410-copy-1.webp",
      "Sobre a PromoPost",
    ),
    titulo: "Sobre Nós",
    blocos: [
      {
        titulo: "CONSUMIDOR",
        texto:
          "A PromoPost Alphaville é o lugar certo para quem mora ou trabalha na região; vive, consome e gosta de ficar por dentro e participar de promoções! As melhores promoções, ofertas, descontos, prêmios, benefícios, sorteios e novidades do mercado aparecem aqui para que você possa escolher as que são de seu interesse. Siga no Instagram, cadastre-se aqui no site e fique sabendo das melhores promoções de Alphaville e Região!",
      },
      {
        titulo: "ANUNCIANTE",
        texto:
          "A PromoPost Alphaville é pra você que já faz Promoções no seu negócio para aumentar as vendas e atrair mais clientes! Utilizamos o poder do Instagram para divulgar e engajar quem mora ou trabalha na Região de Alphaville. São mais de 91.800 residentes e um fluxo diário de aproximadamente 240 mil pessoas! É muita gente!!! Na PromoPost Alphaville seus Posts aparecem no nosso Instagram conforme o planejamento das suas campanhas, atingindo o público certo que consome por aqui e que adora Promoções! Entre em contato conosco para saber mais!",
      },
    ],
  },
});
await payload.updateGlobal({
  slug: "anuncie",
  data: {
    seo: {
      titulo: "Anuncie – PromoPost",
      descricao:
        "Anuncie na PromoPost Ads e apareça para mais de 330 mil pessoas que moram, trabalham e consomem em Alphaville e região.",
    },
    banner: await img(
      "/images/03.anuncie_1400x410-copy-1.webp",
      "Anuncie na PromoPost",
    ),
    titulo: "Anuncie",
    subtitulo: "PromoPost Ads",
    texto: rico(ricos.anuncie),
    botao: { label: "QUERO ANUNCIAR", href: "/contato/" },
  },
});
await payload.updateGlobal({
  slug: "contato",
  data: {
    seo: {
      titulo: "Contato – PromoPost",
      descricao:
        "Fale com a PromoPost Alphaville: anúncios, sugestões e dúvidas.",
    },
    banner: await img(
      "/images/04.contato_1400x410-copy-1.webp",
      "Contato PromoPost",
    ),
    titulo: "Contato",
    texto: rico(ricos.contato),
  },
});
await payload.updateGlobal({
  slug: "cadastro",
  data: {
    seo: {
      titulo: "Cadastro – PromoPost",
      descricao:
        "Cadastre-se na PromoPost e receba as melhores promoções de Alphaville e região.",
    },
    banner: await img(
      "/images/07.cadastro_1400x410-copy-2.webp",
      "Cadastro PromoPost",
    ),
    titulo: "Cadastro",
    texto: rico(ricos.cadastro),
  },
});
await payload.updateGlobal({
  slug: "privacidade",
  data: {
    seo: {
      titulo: "Política de Privacidade – PromoPost",
      descricao: "Política de Privacidade da PromoPost.",
    },
    titulo: "Política de Privacidade​",
    texto: rico(privacidade),
  },
});
await payload.updateGlobal({
  slug: "termos",
  data: {
    seo: {
      titulo: "Termos de Uso – PromoPost",
      descricao: "Termos de Uso da PromoPost.",
    },
    titulo: "Termos de Uso",
    texto: rico(termos),
  },
});

// ── usuário inicial (trocar a senha no primeiro acesso) ──
if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_SENHA) {
  const existe = await payload.find({
    collection: "users",
    where: { email: { equals: process.env.SEED_ADMIN_EMAIL } },
  });
  if (!existe.docs.length) {
    await payload.create({
      collection: "users",
      data: {
        email: process.env.SEED_ADMIN_EMAIL,
        password: process.env.SEED_ADMIN_SENHA,
        nome: "Administrador",
      },
    });
  }
}

payload.logger.info(`Importação concluída: ${midia.size} imagens.`);
process.exit(0);
