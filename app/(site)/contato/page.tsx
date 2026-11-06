import { PaginaContato } from "@/components/pages/Contato";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () => metadataPagina("contato", "/contato/");

export default async function Page() {
  const props = await carregarPagina("contato");
  return (
    <PageShell current="/contato/">
      <PaginaContato {...props} />
    </PageShell>
  );
}
