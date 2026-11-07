import type { PropsPagina } from "./tipos";
import type { Anunciante, Banner } from "@/types/content";
import { Carousel } from "@/components/blocks/Carousel";
import { ElementorForm } from "@/components/blocks/ElementorForm";

/** Conteúdo da página "Cadastro" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaCadastro({
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
                src={p.banner?.src}
                srcSet={
                  p.banner
                    ? (p.banner.srcSet ??
                      `${p.banner.src} ${p.banner.largura ?? 1400}w`)
                    : undefined
                }
                sizes="100vw"
                className="attachment-full size-full wp-image-2936"
                alt={p.banner?.alt ?? ""}
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
              {p.titulo}
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-836d5a7 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor">
          {" "}
          <div
            className="elementor-widget-container"
            dangerouslySetInnerHTML={{ __html: p.html ?? "" }}
          ></div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-60ff717 elementor-button-align-stretch elementor-widget elementor-widget-form">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <ElementorForm tipo="cadastro" config={formularios} />{" "}
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
              {tituloApoio}
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
