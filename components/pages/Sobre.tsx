import type { PropsPagina } from "./tipos";
import type { Anunciante, Banner } from "@/types/content";
import { Carousel } from "@/components/blocks/Carousel";

/** Conteúdo da página "Sobre" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaSobre({
  p,
  apoio,
  destaque,
  beneficios,
  tituloApoio,
  tituloDestaque,
  formularios,
}: PropsPagina) {
  return (
    <main
      id="content"
      data-elementor-type="wp-page"
      data-elementor-id="1124"
      className="elementor elementor-1124"
    >
      <div className="elementor-element elementor-element-4498bb1 e-flex e-con-boxed e-con e-parent e-lazyloaded">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-b175c25 elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <img
                fetchPriority="high"
                width="1400"
                height="410"
                src={p.banner?.src}
                srcSet={
                  p.banner
                    ? `${p.banner.src} ${p.banner.largura ?? 1400}w`
                    : undefined
                }
                sizes="100vw"
                className="attachment-full size-full wp-image-1602"
                alt={p.banner?.alt ?? ""}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-35fc1bc e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-bc88fec elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h1 className="elementor-heading-title elementor-size-default">
              {p.titulo}
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-d0eadeb e-grid e-con-boxed e-con e-child">
          {" "}
          <div className="e-con-inner">
            {" "}
            <div className="elementor-element elementor-element-5b0a126 elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-heart"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {p.blocos?.[0]?.titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {p.blocos?.[0]?.texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-f464d03 elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-star"
                        viewBox="0 0 576 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {p.blocos?.[1]?.titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {p.blocos?.[1]?.texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-0f338ef e-con-full e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-59a623d elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h2 className="elementor-heading-title elementor-size-default">
              {tituloApoio}
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-5c27569 elementor-widget__width-inherit elementor-widget elementor-widget-ucaddon_card_carousel">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <Carousel widgetId="5c27569" slides={apoio} />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </main>
  );
}
