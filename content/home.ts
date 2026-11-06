import type { Home } from "@/types/content";

export const home: Home = {
  meta: {
    title: "PromoPost – As top promoções de Alphaville",
    description: "As melhores promoções de Alphaville e região.",
  },
  tituloPrincipal: "AS MELHORES PROMOÇÕES DE ALPHAVILLE E REGIÃO!",
  tituloDestaque: "EM DESTAQUE",
  tituloOfertas: "MAIS OFERTAS",
  tituloApoio: "APOIO INSTITUCIONAL",
  imagemBeneficios: {
    src: "/images/05.banner_internos_1400x410-copy.webp",
    srcSet:
      "/images/05.banner_internos_1400x410-copy.webp 677w, /images/05.banner_internos_1400x410-copy-300x212.webp 300w",
    largura: 677,
    altura: 479,
  },
  beneficios: [
    {
      titulo: "Fortaleça sua marca",
      texto:
        "Aumente sua frequência no mercado Regional de Alphaville e mantenha uma relação de engajamento, interesse e relevância junto aos seus clientes e novos consumidores.",
    },
    {
      titulo: "Venda mais",
      texto:
        "Divulgue e atraia mais clientes com suas promoções, descontos, ofertas, benefícios, prêmios, sorteios, novidades, lançamentos e ações de marketing.",
    },
    {
      titulo: "Amplie seu alcance",
      texto:
        "Apareça para mais de 330 mil pessoas que moram, trabalham, vivem e consomem diariamente em Alphaville e Região!",
    },
    {
      titulo: "Redes Sociais",
      texto:
        "Amplie ainda mais sua presença digital com nosso Instagram para divulgar e engajar quem mora ou trabalha na Região de Alphaville.",
    },
  ],
};
