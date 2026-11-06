/**
 * Texto formatado do CMS (Lexical) → HTML do site.
 * `paragrafosEmListas`: o original da Política de Privacidade tem parágrafos (<p>) dentro dos itens
 * de lista; o editor guarda isso como quebras de linha. Aqui recompomos os <p> para o espaçamento
 * ficar idêntico ao original (e igual para textos novos digitados no painel).
 */
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { HTMLConvertersFunction } from "@payloadcms/richtext-lexical/html";

type No = { type: string; children?: No[]; value?: number };

/** Texto com estilo próprio (ex.: tamanho de fonte vindo do original) vira <span style>. */
const textoComEstilo = (({ defaultConverters }) => ({
  ...defaultConverters,
  text: (args) => {
    const html = (defaultConverters.text as (a: typeof args) => string)(args);
    const estilo = (args.node as unknown as { style?: string }).style;
    return estilo ? `<span style="${estilo.replace(/"/g, "")}">${html}</span>` : html;
  },
})) as HTMLConvertersFunction;

const comParagrafos = ((args: Parameters<HTMLConvertersFunction>[0]) => ({
  ...textoComEstilo(args),
  listitem: (args) => {
    const node = args.node as unknown as No;
    const filhos = node.children ?? [];
    const sublistas = filhos.filter((c) => c.type === "list");
    const inline = filhos.filter((c) => c.type !== "list");
    // separa o conteúdo em parágrafos nas quebras de linha
    const blocos: No[][] = [[]];
    for (const c of inline) {
      if (c.type === "linebreak") blocos.push([]);
      else blocos[blocos.length - 1].push(c);
    }
    const ps = blocos
      .filter((b) => b.length)
      .map((b) => `<p>${args.nodesToHTML({ nodes: b as never }).join("")}</p>`)
      .join("");
    const subs = sublistas.length ? args.nodesToHTML({ nodes: sublistas as never }).join("") : "";
    if (!ps && subs) return `<li style="list-style-type: none;" value="${node.value ?? ""}">${subs}</li>`;
    return `<li value="${node.value ?? ""}">${ps}${subs}</li>`;
  },
})) as HTMLConvertersFunction;

export function richTextParaHtml(data: unknown, opcoes: { paragrafosEmListas?: boolean } = {}) {
  if (!data) return "";
  return convertLexicalToHTML({
    data: data as never,
    disableContainer: true,
    converters: opcoes.paragrafosEmListas ? comParagrafos : textoComEstilo,
  });
}
