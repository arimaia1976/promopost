import type { Anunciante, Banner, Beneficio, Formularios, Pagina } from "@/types/content";

export type PropsPagina = {
  p: Pagina;
  apoio: Banner[];
  destaque: Anunciante[];
  beneficios: Record<"fortaleca" | "venda" | "alcance" | "redes", Beneficio>;
  tituloApoio: string;
  tituloDestaque: string;
  formularios: Formularios;
};
