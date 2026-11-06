import type { Field, GlobalConfig } from "payload";
import { bannerFields, imagem, linkFields, seo } from "../fields/comuns";
import { revalidarSite } from "../revalidar";

const comum = {
  access: { read: () => true },
  hooks: { afterChange: [revalidarSite] },
} satisfies Partial<GlobalConfig>;

const texto = (name: string, label: string, required = true): Field => ({
  name,
  label,
  type: "text",
  required,
});
const area = (name: string, label: string, required = true): Field => ({
  name,
  label,
  type: "textarea",
  required,
});
const rico = (name: string, label: string): Field => ({
  name,
  label,
  type: "richText",
  required: true,
});
const bannerPagina = imagem(
  "banner",
  "Banner do topo da página",
  "1400×410, como os atuais.",
);

// ───────────── Compartilhado (fonte única, aparece em várias páginas) ─────────────

export const Cabecalho: GlobalConfig = {
  ...comum,
  slug: "cabecalho",
  label: "Cabeçalho",
  admin: { group: "Compartilhado (todas as páginas)" },
  fields: [
    imagem("logo", "Logo"),
    {
      name: "menuDesktop",
      label: "Menu (computador)",
      type: "array",
      fields: linkFields,
    },
    {
      name: "menuCelular",
      label: "Menu (celular)",
      type: "array",
      fields: linkFields,
    },
    {
      name: "botoes",
      label: "Botões vermelhos",
      type: "array",
      maxRows: 2,
      minRows: 2,
      fields: linkFields,
    },
  ],
};

export const Rodape: GlobalConfig = {
  ...comum,
  slug: "rodape",
  label: "Rodapé",
  admin: { group: "Compartilhado (todas as páginas)" },
  fields: [
    imagem("logo", "Logo (computador)"),
    imagem("logoCelular", "Logo (celular)"),
    {
      name: "menu",
      label: "Menu do rodapé",
      type: "array",
      fields: linkFields,
    },
    texto("instagram", "Link do Instagram"),
    imagem("qrCode", "QR Code"),
    texto("chamadaInstagram", "Chamada do Instagram"),
    texto("copyright", "Texto de copyright"),
  ],
};

export const Apoio: GlobalConfig = {
  ...comum,
  slug: "apoio",
  label: "Apoio Institucional",
  admin: {
    group: "Compartilhado (todas as páginas)",
    description:
      "Carrossel que aparece no fim de Home, Sobre, Anuncie, Contato e Cadastro.",
  },
  fields: [
    texto("titulo", "Título"),
    {
      name: "banners",
      label: "Banners",
      type: "array",
      minRows: 1,
      fields: bannerFields,
    },
  ],
};

export const Vitrine: GlobalConfig = {
  ...comum,
  slug: "vitrine",
  label: "Títulos das vitrines",
  admin: {
    group: "Compartilhado (todas as páginas)",
    description: 'Os anunciantes ficam em "Anunciantes".',
  },
  fields: [
    texto("tituloDestaque", 'Título "Em destaque"'),
    texto("tituloOfertas", 'Título "Mais ofertas"'),
  ],
};

const beneficio = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [texto("titulo", "Título"), area("texto", "Texto")],
});

export const Beneficios: GlobalConfig = {
  ...comum,
  slug: "beneficios",
  label: "Benefícios",
  admin: {
    group: "Compartilhado (todas as páginas)",
    description:
      "Os 4 blocos com ícone que aparecem na Home e na página Anuncie.",
  },
  fields: [
    beneficio("fortaleca", "Bloco do coração"),
    beneficio("venda", "Bloco do gráfico"),
    beneficio("alcance", "Bloco do foguete"),
    beneficio("redes", "Bloco do Instagram"),
  ],
};

const formulario = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    {
      name: "emailDestino",
      label: "Enviar para (e-mail)",
      type: "text",
      admin: {
        description:
          "Vazio = usa o e-mail configurado no servidor. Vários: separe por vírgula.",
      },
    },
    texto("assunto", "Assunto do e-mail"),
    texto("botao", "Texto do botão"),
    texto("sucesso", "Mensagem de sucesso"),
    texto("erro", "Mensagem de erro"),
  ],
});

export const Formularios: GlobalConfig = {
  ...comum,
  access: { read: () => true },
  slug: "formularios",
  label: "Formulários",
  admin: { group: "Compartilhado (todas as páginas)" },
  fields: [
    formulario("contato", "Formulário de Contato"),
    {
      name: "assuntos",
      label: 'Opções do campo "Assunto" (Contato)',
      type: "array",
      minRows: 1,
      fields: [texto("opcao", "Opção")],
    },
    formulario("cadastro", "Formulário de Cadastro"),
    texto("textoNovidades", "Texto da caixinha de novidades (Cadastro)"),
  ],
};

// ───────────── Páginas ─────────────

export const Home: GlobalConfig = {
  ...comum,
  slug: "home",
  label: "Home",
  admin: { group: "Páginas" },
  fields: [
    seo,
    texto("tituloPrincipal", "Título abaixo do slider"),
    imagem("imagemBeneficios", "Imagem ao lado dos benefícios"),
  ],
};

export const Sobre: GlobalConfig = {
  ...comum,
  slug: "sobre",
  label: "Sobre",
  admin: { group: "Páginas" },
  fields: [
    seo,
    bannerPagina,
    texto("titulo", "Título"),
    {
      name: "blocos",
      label: "Blocos (Consumidor / Anunciante)",
      type: "array",
      minRows: 2,
      maxRows: 2,
      fields: [texto("titulo", "Título"), area("texto", "Texto")],
    },
  ],
};

export const Anuncie: GlobalConfig = {
  ...comum,
  slug: "anuncie",
  label: "Anuncie",
  admin: { group: "Páginas" },
  fields: [
    seo,
    bannerPagina,
    texto("titulo", "Título"),
    texto("subtitulo", "Subtítulo"),
    rico("texto", "Texto"),
    { name: "botao", label: "Botão", type: "group", fields: linkFields },
  ],
};

export const Contato: GlobalConfig = {
  ...comum,
  slug: "contato",
  label: "Contato",
  admin: { group: "Páginas" },
  fields: [
    seo,
    bannerPagina,
    texto("titulo", "Título"),
    rico("texto", "Texto acima do formulário"),
  ],
};

export const Cadastro: GlobalConfig = {
  ...comum,
  slug: "cadastro",
  label: "Cadastro",
  admin: { group: "Páginas" },
  fields: [
    seo,
    bannerPagina,
    texto("titulo", "Título"),
    rico("texto", "Texto acima do formulário"),
  ],
};

export const Privacidade: GlobalConfig = {
  ...comum,
  slug: "privacidade",
  label: "Política de Privacidade",
  admin: { group: "Páginas" },
  fields: [seo, texto("titulo", "Título"), rico("texto", "Texto")],
};

export const Termos: GlobalConfig = {
  ...comum,
  slug: "termos",
  label: "Termos de Uso",
  admin: { group: "Páginas" },
  fields: [seo, texto("titulo", "Título"), rico("texto", "Texto")],
};

export const globals = [
  Home,
  Sobre,
  Anuncie,
  Contato,
  Cadastro,
  Privacidade,
  Termos,
  Cabecalho,
  Rodape,
  Apoio,
  Vitrine,
  Beneficios,
  Formularios,
];
