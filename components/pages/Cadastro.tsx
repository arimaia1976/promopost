import type { Anunciante, Banner } from "@/types/content";
import { Carousel } from "@/components/blocks/Carousel";
import { ElementorForm } from "@/components/blocks/ElementorForm";

/** Conteúdo da página "Cadastro" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaCadastro({
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
      data-elementor-id="2122"
      className="elementor elementor-2122"
    >
      <div className="elementor-element elementor-element-15ddf52 e-flex e-con-boxed e-con e-parent e-lazyloaded">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-cff3307 elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <img
                fetchPriority="high"
                width="1400"
                height="410"
                src="/images/07.cadastro_1400x410-copy-2.webp"
                className="attachment-full size-full wp-image-2936"
                alt=""
                srcSet="/images/07.cadastro_1400x410-copy-2.webp 1400w, /images/07.cadastro_1400x410-copy-2-300x88.webp 300w, /images/07.cadastro_1400x410-copy-2-1024x300.webp 1024w, /images/07.cadastro_1400x410-copy-2-768x225.webp 768w"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-be58246 e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-f72bc9b elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h1 className="elementor-heading-title elementor-size-default">
              Cadastro
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-836d5a7 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <p style={{ textAlign: "center" }}>
              Faça seu cadastro na PromoPost para ficar por dentro das Melhores
              Promoções de Alphaville e Região!
              <br />
              Quando tivermos novidades e promoções exclusivas você receberá
              nosso e-mail em primeira mão, aguarde!
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-60ff717 elementor-button-align-stretch elementor-widget elementor-widget-form">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <ElementorForm tipo="cadastro" />{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-52e5802 e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-3303609 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h2 className="elementor-heading-title elementor-size-default">
              APOIO INSTITUCIONAL
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-041a698 elementor-widget__width-inherit elementor-widget elementor-widget-ucaddon_card_carousel">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <Carousel widgetId="041a698" slides={apoio} />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </main>
  );
}
