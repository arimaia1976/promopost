import { PaginaSobre } from "@/components/pages/Sobre";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () => metadataPagina("sobre", "/sobre/");

export default async function Page() {
  const props = await carregarPagina("sobre");
  return (
    <PageShell current="/sobre/">
      <PaginaSobre {...props} />
    </PageShell>
  );
}
