import type { Metadata } from "next";
import { PaginaContato } from "@/components/pages/Contato";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contato – PromoPost",
  description:
    "Fale com a PromoPost Alphaville: anúncios, sugestões e dúvidas.",
  alternates: { canonical: "/contato/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    Promise.resolve([]),
  ]);
  return (
    <PageShell current="/contato/">
      <PaginaContato apoio={apoio} destaque={destaque} texto={""} />
    </PageShell>
  );
}
