import type { Field } from "payload";

/** Campos de SEO de cada página. */
export const seo: Field = {
  name: "seo",
  label: "SEO (Google)",
  type: "group",
  fields: [
    {
      name: "titulo",
      label: "Título da aba / Google",
      type: "text",
      required: true,
    },
    { name: "descricao", label: "Descrição no Google", type: "textarea" },
  ],
};

/** Link de menu/botão. */
export const linkFields: Field[] = [
  { name: "label", label: "Texto", type: "text", required: true },
  {
    name: "href",
    label: "Link",
    type: "text",
    required: true,
    admin: { description: "Ex.: /sobre/ ou https://..." },
  },
];

/** Imagem obrigatória da biblioteca de mídia. */
export const imagem = (
  name: string,
  label: string,
  description?: string,
): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  required: true,
  admin: description ? { description } : undefined,
});

/** Item de carrossel (banner com link opcional). */
export const bannerFields: Field[] = [
  imagem(
    "imagem",
    "Imagem",
    "Mesmo tamanho dos banners atuais (ex.: 1920×619).",
  ),
  { name: "link", label: "Link ao clicar", type: "text" },
  {
    name: "novaAba",
    label: "Abrir em nova aba",
    type: "checkbox",
    defaultValue: true,
  },
];
