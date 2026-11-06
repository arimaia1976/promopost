import type { Metadata } from "next";
import { Beneficios } from "@/components/blocks/Beneficios";
import { Apoio, GradeAnunciantes, Hero } from "@/components/blocks/Sections";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getAnunciantes, getBanners, getGlobals, getHome } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return {
    title: home.meta.title,
    description: home.meta.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [globals, home, topo, apoio, destaque, ofertas] = await Promise.all([
    getGlobals(),
    getHome(),
    getBanners("topo"),
    getBanners("apoio"),
    getAnunciantes(true),
    getAnunciantes(false),
  ]);

  return (
    <>
      <a className="skip-link screen-reader-text" href="#content">
        Pular para o conteúdo
      </a>
      <Header globals={globals} current="/" />
      <main
        id="content"
        data-elementor-type="wp-page"
        data-elementor-id="15"
        className="elementor elementor-15"
      >
        <Hero banners={topo} titulo={home.tituloPrincipal} />
        <GradeAnunciantes
          tipo="destaque"
          titulo={home.tituloDestaque}
          itens={destaque}
        />
        <GradeAnunciantes
          tipo="ofertas"
          titulo={home.tituloOfertas}
          itens={ofertas}
        />
        <Beneficios
          beneficios={home.beneficios}
          imagem={home.imagemBeneficios}
        />
        <Apoio banners={apoio} titulo={home.tituloApoio} />
      </main>
      <Footer globals={globals} current="/" />
    </>
  );
}
