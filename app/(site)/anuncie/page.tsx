import { PaginaAnuncie } from "@/components/pages/Anuncie";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () => metadataPagina("anuncie", "/anuncie/");

export default async function Page() {
  const props = await carregarPagina("anuncie");
  return (
    <PageShell current="/anuncie/">
      <PaginaAnuncie {...props} />
    </PageShell>
  );
}
