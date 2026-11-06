import type { Anunciante, Banner } from "@/types/content";
import { Carousel } from "@/components/blocks/Carousel";
import { ElementorForm } from "@/components/blocks/ElementorForm";

/** Conteúdo da página "Contato" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaContato({
  apoio,
  destaque,
  texto,
}: {
  apoio: Banner[];
  destaque: Anunciante[];
  texto: string;
}) {
  return (
    <main
      id="content"
      data-elementor-type="wp-page"
      data-elementor-id="437"
      className="elementor elementor-437"
    >
      <div className="elementor-element elementor-element-15ddf52 e-flex e-con-boxed e-con e-parent e-lazyloaded">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-9b25520 elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <img
                fetchPriority="high"
                width="1400"
                height="410"
                src="/images/04.contato_1400x410-copy-1.webp"
                className="attachment-full size-full wp-image-1606"
                alt=""
                srcSet="/images/04.contato_1400x410-copy-1.webp 1400w, /images/04.contato_1400x410-copy-1-300x88.webp 300w, /images/04.contato_1400x410-copy-1-1024x300.webp 1024w, /images/04.contato_1400x410-copy-1-768x225.webp 768w"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-be58246 e-flex e-con-boxed e-con e-parent e-lazyloaded">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-a052758 elementor-widget elementor-widget-html">
            {" "}
            <div className="elementor-widget-container"> </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-f72bc9b elementor-widget__width-inherit elementor-widget elementor-widget-heading">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <h1 className="elementor-heading-title elementor-size-default">
                Contato
              </h1>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-6b96927 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <p>
                Interessado em anunciar e saber mais sobre a PromoPost
                Alphaville? Ou talvez queira compartilhar uma sugestão ou até
                mesmo uma crítica?
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-95db6c7 elementor-widget__width-inherit elementor-button-align-stretch elementor-widget elementor-widget-form">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <ElementorForm tipo="contato" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-7b43d6c e-con-full e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-884e3d3 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h2 className="elementor-heading-title elementor-size-default">
              APOIO INSTITUCIONAL
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-f840d5a elementor-widget__width-inherit elementor-widget elementor-widget-ucaddon_card_carousel">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <Carousel widgetId="f840d5a" slides={apoio} />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </main>
  );
}
