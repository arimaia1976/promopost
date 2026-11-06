import type { Anunciante } from "@/types/content";

type Props = {
  anunciante: Anunciante;
  /** Modelo visual do card: 1833 = "Em destaque", 1931 = "Mais ofertas". */
  modelo: "1833" | "1931";
};

export function AnuncianteCard({ anunciante: a, modelo }: Props) {
  return (
    <div className="jet-listing-grid__item">
      <div
        data-elementor-type="jet-listing-items"
        data-elementor-id={modelo}
        className={`elementor elementor-${modelo}`}
      >
        <div className="elementor-element elementor-element-f77d086 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-45fcdb6 elementor-widget elementor-widget-hotspot">
            <div className="elementor-widget-container">
              <img
                src={a.imagem}
                title={a.imagemAlt}
                alt={a.imagemAlt}
                loading="lazy"
              />
            </div>
          </div>
          <div className="elementor-element elementor-element-30420e3 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-8bca3c3 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading">
              <div className="elementor-widget-container">
                <h5 className="elementor-heading-title elementor-size-default">
                  {a.categoria}
                </h5>
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-9554cf2 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-0a73f02 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-df648b3 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h4 className="elementor-heading-title elementor-size-default">
                    {a.nome}
                  </h4>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-0202d12 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-80e58a6 elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h5 className="elementor-heading-title elementor-size-default">
                    {a.descricao}
                  </h5>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-f709dcf e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-486eaa2 elementor-align-justify elementor-widget-mobile__width-inherit elementor-button-success elementor-widget elementor-widget-button">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <a
                      className="elementor-button elementor-button-link elementor-size-sm"
                      href={a.link}
                      aria-label={`Saiba mais sobre ${a.nome.replace(/ /g, " ")}`}
                    >
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">
                          Saiba mais
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
