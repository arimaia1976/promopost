import type { Anunciante } from "@/types/content";

/** destaque=true → "Em destaque"; false → "Mais ofertas". */
export const anunciantes: Anunciante[] = [
  {
    id: 3516,
    nome: "Royal\u00a0 Barueri",
    categoria: "APARTAMENTOS",
    descricao:
      "Design neoclássico e beleza natural se reúnem neste refúgio de tranquilidade e exclusividade.",
    imagem:
      "/images/11679-CNA-ARTES-PROMOPOST-ROYAL-II_card-copy-rg45qesq2v4pfuy71yj5nzxhfrpcwpwxeep4kefwl4.webp",
    imagemAlt: "#11679 [CNA] ARTES PROMOPOST ROYAL II_card copy",
    link: "https://royalbarueri.com.br/",
    destaque: true,
    ordem: 1,
  },
  {
    id: 3515,
    nome: "Camelo Pizzaria",
    categoria: "PIZZARIA",
    descricao:
      "Nosso cardápio traz as clássicas pizzas de massa fina e bordas crocantes, preparadas com ingredientes super selecionados.",
    imagem:
      "/images/CARD_CAMELO-rcbxiw1wudepqhvtxlcmz5qhyzoe4um5tii5gx5394.webp",
    imagemAlt: "CARD_CAMELO",
    link: "https://www.instagram.com/cameloalphaville/",
    destaque: true,
    ordem: 2,
  },
  {
    id: 3300,
    nome: "KA’A Home Boutique",
    categoria: "APARTAMENTOS",
    descricao:
      "KA'A Home Boutique - 3 Suítes - 130m². Equilíbrio perfeito entre natureza e sofisticação. Agende uma visita e encante-se.",
    imagem:
      "/images/Card-KAA-copy-rcbxircpw78a4g2np1bi4ox702bk2d3i4v8q2jc248.webp",
    imagemAlt: "Card KAA copy",
    link: "https://kaahomeboutique.com.br/",
    destaque: true,
    ordem: 3,
  },
  {
    id: 3549,
    nome: "Açougue Rio Negro",
    categoria: "AÇOUGUE",
    descricao:
      "Cortes para o dia a dia, cortes especiais, churrasco, assados, rotisseria, hortifruti, mercearia e muito mais.",
    imagem:
      "/images/Card_acougue_rionegro-rksiv9zju9o0ls0m8zfi09p8g5eobh88wf9j3vubi0.webp",
    imagemAlt: "Card_acougue_rionegro.webp",
    link: "https://www.instagram.com/acouguerionegro?igsh=eTdieHc5eHV6MTg=",
    destaque: true,
    ordem: 4,
  },
  {
    id: 3427,
    nome: "Acqua Park Barueri",
    categoria: "APARTAMENTOS",
    descricao:
      "More em um resort paradisíaco, em meio à natureza, com lazer incomparável.",
    imagem:
      "/images/card-aquapark-copy-rcbxiqevpd6zsu40uiwvk75qeog6unzrsql8l9dgag.webp",
    imagemAlt: "card aquapark copy",
    link: "https://acquaparkbarueri.com.br/",
    destaque: false,
    ordem: 1,
  },
  {
    id: 3569,
    nome: "Padaria Central Barueri",
    categoria: "PADARIA",
    descricao:
      "A Central une qualidade e tradição em Barueri, do café ao jantar, com delivery, encomendas e eventos.",
    imagem:
      "/images/Card_PadariaCentral-rouzrof2bgym29hf2mj1bqr2t13ifoxxbz4grdb6wo.webp",
    imagemAlt: "Card_PadariaCentral",
    link: "https://www.instagram.com/padariacentralbarueri",
    destaque: false,
    ordem: 2,
  },
  {
    id: 3289,
    nome: "Pharma Apoio",
    categoria: "SAÚDE",
    descricao:
      "A farmácia delivery mais rápida de Alphaville e Tamboré. Medicamentos, Perfumaria, Cosméticos e muito mais.",
    imagem:
      "/images/Card-Pharma-copy-rg45qldlepdpp4omzjdjng9plgsxeln1rb9ixc65dk.webp",
    imagemAlt: "Card Pharma copy",
    link: "https://www.instagram.com/pharmaapoiodrogaria?igsh=MW0zamhrZ3lmdmw2dA==qq",
    destaque: false,
    ordem: 3,
  },
  {
    id: 3139,
    nome: "J&J Mundial",
    categoria: "JOALHERIA",
    descricao:
      "Consertos e fabricação de joias e semijoias. Relógios e acessórios, compra de ouro, prata, relógios suíços e pedras preciosas",
    imagem: "/images/Card-JJ-rky0pvwrbrzcgm137rrbywjguqz37thqu2cia32u9k.webp",
    imagemAlt: "Card J&J",
    link: "https://www.instagram.com/_jejmundialjoalheria_?utm_source=qr&igsh=cXNteGs2NmdvYjA5",
    destaque: false,
    ordem: 4,
  },
  {
    id: 1853,
    nome: "Tivolli Sports",
    categoria: "ESPORTES",
    descricao:
      "Tudo em Sport & Style: Corrida, Futebol, Ballet, Natação, Tennis, Beach Tennis, Casual, Top Brands, Kids Shoes",
    imagem:
      "/images/Card-Novo-Tivolli-copy-rcbxjeuon24g6p4ivth6d0zpup3qesosk3jv2gd7so.webp",
    imagemAlt: "Card Novo Tivolli copy",
    link: "http://www.tivollisports.com.br",
    destaque: false,
    ordem: 5,
  },
  {
    id: 2704,
    nome: "Terra do Fogo",
    categoria: "AVENTURA",
    descricao:
      "Terra do Fogo Eco Parque. Aventura, comida raiz e diversão para toda a família – até os pets podem viver essa experiência!",
    imagem:
      "/images/CARD_TERRA-DO-FOGO-copy-rcbxjfsitw5qib35qbvsxir6g2z3mhsiw87cjqbtmg.webp",
    imagemAlt: "CARD_TERRA DO FOGO copy",
    link: "https://terradofogoecoparque.com.br/",
    destaque: false,
    ordem: 6,
  },
  {
    id: 3444,
    nome: "Colchões Castor",
    categoria: "SONHOS",
    descricao:
      "Com mais de 60 anos de história, a Colchões Castor se destaca no mercado pela sua qualidade incomparável e pela constante inovação",
    imagem:
      "/images/Card-Novo-Castor-copy-rcbxjfsitw5qib35qbvsxir6g2z3mhsiw87cjqbtmg.webp",
    imagemAlt: "Card Novo Castor copy",
    link: "https://www.instagram.com/castor_alphaville?igsh=ejlrNTZnOGhoNTIz",
    destaque: false,
    ordem: 7,
  },
  {
    id: 3415,
    nome: "Di Amici",
    categoria: "SABORES",
    descricao:
      "Rotisserie e Salumeria Italiana que oferece produtos elaborados e excelência. ​Antepastos | Massas | Molhos | Carnes | Sobremesas",
    imagem:
      "/images/Amici_Card-rcbxj4igjvqamzjjk70a3llnbgip24jquodisesjp4.webp",
    imagemAlt: "Amici_Card",
    link: "http://www.diamicisalumeria.com.br/",
    destaque: false,
    ordem: 8,
  },
];
