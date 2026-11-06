import type { Anunciante, Banner } from "@/types/content";
import { AnuncianteCard } from "./AnuncianteCard";
import { Carousel } from "./Carousel";

/** Título de seção no padrão do site (h2 vermelho/azul conforme o CSS da seção). */
function Titulo({ widgetId, texto }: { widgetId: string; texto: string }) {
  return (
    <div
      className={`elementor-element elementor-element-${widgetId} elementor-widget__width-inherit elementor-widget elementor-widget-heading`}
    >
      <div className="elementor-widget-container">
        <h2 className="elementor-heading-title elementor-size-default">
          {texto}
        </h2>
      </div>
    </div>
  );
}

function CarouselWidget({
  widgetId,
  slides,
  prioridade,
}: {
  widgetId: string;
  slides: Banner[];
  prioridade?: boolean;
}) {
  return (
    <div
      className={`elementor-element elementor-element-${widgetId} elementor-widget__width-inherit elementor-widget elementor-widget-ucaddon_card_carousel`}
    >
      <div className="elementor-widget-container">
        <Carousel widgetId={widgetId} slides={slides} prioridade={prioridade} />
      </div>
    </div>
  );
}

/** Slider do topo + título principal da Home. */
export function Hero({
  banners,
  titulo,
}: {
  banners: Banner[];
  titulo: string;
}) {
  return (
    <div className="elementor-element elementor-element-a37a027 e-flex e-con-boxed e-con e-parent e-lazyloaded">
      <div className="e-con-inner">
        <CarouselWidget widgetId="2688f3e" slides={banners} prioridade />
        <div className="elementor-element elementor-element-756564d elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          <div className="elementor-widget-container">
            <h1 className="elementor-heading-title elementor-size-default">
              {titulo}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const GRADES = {
  destaque: {
    secao: "d880155",
    container: "c41d4a4",
    titulo: "53a3da6",
    grade: "9a9a1b9",
    modelo: "1833",
    colunas: "grid-col-desk-4 grid-col-tablet-4 grid-col-mobile-1",
    lazy: " e-lazyloaded",
  },
  ofertas: {
    secao: "4ce0c2b",
    container: "37fd178",
    titulo: "06b374f",
    grade: "5351581",
    modelo: "1931",
    colunas: "grid-col-desk-4 grid-col-tablet-1 grid-col-mobile-1",
    lazy: "",
  },
} as const;

/** Grade de anunciantes ("Em destaque" ou "Mais ofertas"). */
export function GradeAnunciantes({
  tipo,
  titulo,
  itens,
}: {
  tipo: keyof typeof GRADES;
  titulo: string;
  itens: Anunciante[];
}) {
  const g = GRADES[tipo];
  return (
    <div
      className={`elementor-element elementor-element-${g.secao} e-flex e-con-boxed e-con e-parent${g.lazy}`}
    >
      <div className="e-con-inner">
        <div
          className={`elementor-element elementor-element-${g.container} e-con-full e-flex e-con e-child`}
        >
          <Titulo widgetId={g.titulo} texto={titulo} />
          <div
            className={`elementor-element elementor-element-${g.grade} elementor-widget__width-inherit elementor-widget elementor-widget-jet-listing-grid`}
          >
            <div className="elementor-widget-container">
              <div className="jet-listing-grid jet-listing">
                <div
                  className={`jet-listing-grid__items ${g.colunas} jet-listing-grid--${g.modelo}`}
                >
                  {itens.map((a) => (
                    <AnuncianteCard
                      key={a.id}
                      anunciante={a}
                      modelo={g.modelo}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Carrossel "Apoio Institucional". */
export function Apoio({
  banners,
  titulo,
}: {
  banners: Banner[];
  titulo: string;
}) {
  return (
    <div className="elementor-element elementor-element-b648542 e-con-full e-flex e-con e-parent">
      <Titulo widgetId="c5af1a0" texto={titulo} />
      <CarouselWidget widgetId="2b91f9f" slides={banners} />
    </div>
  );
}
