/**
 * Única porta de leitura de conteúdo do site.
 * Fase 1–2: lê os arquivos de /content. Fase 3: passa a ler do Payload
 * (Local API) — só este arquivo muda; componentes e páginas ficam iguais.
 */
import { anunciantes } from "@/content/anunciantes";
import { bannersApoio, bannersTopo } from "@/content/banners";
import { globals } from "@/content/globals";
import { home } from "@/content/home";

export async function getGlobals() {
  return globals;
}

export async function getHome() {
  return home;
}

export async function getBanners(local: "topo" | "apoio") {
  return local === "topo" ? bannersTopo : bannersApoio;
}

export async function getAnunciantes(destaque: boolean) {
  return anunciantes
    .filter((a) => a.destaque === destaque)
    .sort((a, b) => a.ordem - b.ordem);
}
