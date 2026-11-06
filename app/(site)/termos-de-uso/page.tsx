import { PaginaTermos } from "@/components/pages/Termos";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () =>
  metadataPagina("termos", "/termos-de-uso/");

export default async function Page() {
  const props = await carregarPagina("termos");
  return (
    <PageShell current="/termos-de-uso/">
      <PaginaTermos {...props} />
    </PageShell>
  );
}
