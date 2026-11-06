import type { Anunciante, Banner } from "@/types/content";

/** Conteúdo da página "Termos" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaTermos({
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
      data-elementor-id="597"
      className="elementor elementor-597"
    >
      <div className="elementor-element elementor-element-d6e4da0 e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-b162f83 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h1 className="elementor-heading-title elementor-size-default">
              Termos de Uso
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-2ed0069 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor">
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
