import type { Anunciante, Banner } from "@/types/content";

/** Conteúdo da página "Privacidade" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaPrivacidade({
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
      data-elementor-id="620"
      className="elementor elementor-620"
    >
      <div className="elementor-element elementor-element-791bfca5 e-con-full elementor-hidden-desktop elementor-hidden-tablet e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-5799fef9 elementor-widget elementor-widget-spacer">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <div className="elementor-spacer">
              {" "}
              <div className="elementor-spacer-inner"></div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-8d09178 e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-1db0759 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h1 className="elementor-heading-title elementor-size-default">
              Política de Privacidade​
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-da7aa58 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor">
          {" "}
          <div
            className="elementor-widget-container"
            dangerouslySetInnerHTML={{ __html: texto }}
          />{" "}
        </div>{" "}
      </div>
    </main>
  );
}
