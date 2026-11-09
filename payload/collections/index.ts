import type { CollectionConfig } from "payload";
import { revalidarSite } from "../revalidar";
import { bannerFields, imagem } from "../fields/comuns";
import { bloquearImagemEmUso } from "../imagem-em-uso";

const publico = { read: () => true };

export const Usuarios: CollectionConfig = {
  slug: "users",
  labels: { singular: "Usuário", plural: "Usuários" },
  admin: { useAsTitle: "email", group: "Configurações" },
  auth: true,
  fields: [{ name: "nome", label: "Nome", type: "text" }],
};

export const Midia: CollectionConfig = {
  slug: "media",
  labels: { singular: "Imagem", plural: "Imagens" },
  admin: { group: "Configurações" },
  access: publico,
  upload: {
    staticDir: process.env.MEDIA_DIR || "media",
    // sem redimensionar: o site usa o arquivo enviado, como o original
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texto alternativo (acessibilidade/SEO)",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    beforeDelete: [bloquearImagemEmUso],
    afterChange: [revalidarSite],
    afterDelete: [revalidarSite],
  },
};

export const BannersTopo: CollectionConfig = {
  slug: "banners",
  labels: { singular: "Banner do topo", plural: "Banners do topo" },
  admin: {
    group: "Home",
    useAsTitle: "nome",
    defaultColumns: ["nome", "ativo", "inicio", "fim", "ordem"],
    description:
      "Slider do topo da Home. Use as datas para o banner entrar e sair do ar sozinho.",
  },
  access: publico,
  defaultSort: "ordem",
  fields: [
    { name: "nome", label: "Nome interno", type: "text", required: true },
    ...bannerFields,
    { name: "ativo", label: "Ativo", type: "checkbox", defaultValue: true },
    {
      type: "row",
      fields: [
        {
          name: "inicio",
          label: "Entra no ar em",
          type: "date",
          admin: { date: { pickerAppearance: "dayAndTime" } },
        },
        {
          name: "fim",
          label: "Sai do ar em",
          type: "date",
          admin: { date: { pickerAppearance: "dayAndTime" } },
        },
      ],
    },
    {
      name: "ordem",
      label: "Ordem",
      type: "number",
      defaultValue: 10,
      admin: { description: "Menor aparece primeiro." },
    },
  ],
  hooks: { afterChange: [revalidarSite], afterDelete: [revalidarSite] },
};

export const Anunciantes: CollectionConfig = {
  slug: "anunciantes",
  labels: { singular: "Anunciante", plural: "Anunciantes" },
  admin: {
    group: "Home",
    useAsTitle: "nome",
    defaultColumns: ["nome", "secao", "categoria", "ativo", "ordem"],
    description:
      'Cards de anunciantes. "Em destaque" aparece na Home e na página Anuncie.',
  },
  access: publico,
  defaultSort: "ordem",
  fields: [
    { name: "nome", label: "Nome", type: "text", required: true },
    {
      name: "categoria",
      label: "Categoria (faixa laranja)",
      type: "text",
      required: true,
    },
    { name: "descricao", label: "Descrição", type: "textarea", required: true },
    imagem("imagem", "Imagem do card", "Proporção 5:3 (ex.: 500×300)."),
    {
      name: "link",
      label: 'Link do botão "Saiba mais"',
      type: "text",
      required: true,
    },
    {
      name: "secao",
      label: "Seção",
      type: "select",
      required: true,
      defaultValue: "ofertas",
      options: [
        { label: "Em destaque", value: "destaque" },
        { label: "Mais ofertas", value: "ofertas" },
      ],
    },
    { name: "ativo", label: "Ativo", type: "checkbox", defaultValue: true },
    { name: "ordem", label: "Ordem", type: "number", defaultValue: 10 },
  ],
  hooks: { afterChange: [revalidarSite], afterDelete: [revalidarSite] },
};

export const collections = [BannersTopo, Anunciantes, Midia, Usuarios];
