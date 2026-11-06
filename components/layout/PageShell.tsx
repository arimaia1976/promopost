import { getGlobals } from "@/lib/content";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Estrutura comum: link de acessibilidade, topo, conteúdo e rodapé. */
export async function PageShell({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  const globals = await getGlobals();
  return (
    <>
      <a className="skip-link screen-reader-text" href="#content">
        Pular para o conteúdo
      </a>
      <Header globals={globals} current={current} />
      {children}
      <Footer globals={globals} current={current} />
    </>
  );
}
