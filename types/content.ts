/**
 * Tipos de conteúdo do site. Usam apenas campos que o Payload modela
 * diretamente (texto, número, booleano, link, imagem, array), para que a
 * migração da Fase 3 seja um mapeamento 1:1.
 */

export type MenuItem = {
  label: string;
  href: string;
};

/** Item dos carrosséis (slider do topo e Apoio Institucional). */
export type Banner = {
  imagem: string;
  alt: string;
  largura: number;
  altura: number;
  link: string | null;
  novaAba: boolean;
};

/** Card de anunciante ("Em destaque" ou "Mais ofertas"). */
export type Anunciante = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
  link: string;
  destaque: boolean;
  ordem: number;
};

export type Beneficio = {
  titulo: string;
  texto: string;
};

export type Globals = {
  instagram: string;
  copyright: string;
  menuPrincipal: MenuItem[];
  menuMobile: MenuItem[];
  menuRodape: MenuItem[];
  botoesTopo: MenuItem[];
};

export type Home = {
  meta: { title: string; description: string };
  tituloPrincipal: string;
  tituloDestaque: string;
  tituloOfertas: string;
  tituloApoio: string;
  imagemBeneficios: {
    src: string;
    srcSet: string;
    largura: number;
    altura: number;
  };
  beneficios: [Beneficio, Beneficio, Beneficio, Beneficio];
};
