import { PaginaCadastro } from "@/components/pages/Cadastro";
import { PageShell } from "@/components/layout/PageShell";
import { carregarPagina, metadataPagina } from "@/lib/pagina";

export const generateMetadata = () => metadataPagina("cadastro", "/cadastro/");

export default async function Page() {
  const props = await carregarPagina("cadastro");
  return (
    <PageShell current="/cadastro/">
      <PaginaCadastro {...props} />
    </PageShell>
  );
}
