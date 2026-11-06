/** Conteúdo original usado só pela importação inicial (scripts/seed.ts). O site lê do CMS. */
import type { Globals } from "@/types/content";

const paginas = {
  home: { label: "Home", href: "/" },
  sobre: { label: "Sobre", href: "/sobre/" },
  anuncie: { label: "Anuncie", href: "/anuncie/" },
  contato: { label: "Contato", href: "/contato/" },
  cadastro: { label: "Cadastro", href: "/cadastro/" },
  privacidade: {
    label: "Política de Privacidade",
    href: "/politica-de-privacidade/",
  },
  termos: { label: "Termos de Uso", href: "/termos-de-uso/" },
};

export const globals: Omit<
  Globals,
  "logo" | "logoRodape" | "logoRodapeCelular" | "qrCode" | "chamadaInstagram"
> = {
  instagram: "https://www.instagram.com/promopostalphaville/",
  copyright: "Copyright © 2024 PromoPost",
  menuPrincipal: [paginas.home, paginas.sobre, paginas.contato],
  menuMobile: [
    paginas.home,
    paginas.sobre,
    paginas.anuncie,
    paginas.contato,
    paginas.cadastro,
  ],
  menuRodape: [
    paginas.home,
    paginas.sobre,
    paginas.anuncie,
    paginas.cadastro,
    paginas.contato,
    paginas.privacidade,
    paginas.termos,
  ],
  botoesTopo: [
    { label: "Anuncie", href: "/anuncie" },
    { label: "Cadastro", href: "/cadastro/" },
  ],
};
