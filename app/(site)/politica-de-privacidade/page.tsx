import { PaginaPrivacidade } from "@/components/pages/Privacidade";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () =>
  metadataPagina("privacidade", "/politica-de-privacidade/");

export default async function Page() {
  const props = await carregarPagina("privacidade");
  return (
    <PageShell current="/politica-de-privacidade/">
      <PaginaPrivacidade {...props} />
    </PageShell>
  );
}
