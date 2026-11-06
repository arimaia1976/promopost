import type { Metadata } from "next";
import { PaginaTermos } from "@/components/pages/Termos";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";
import { termos } from "@/content/legais";

export const metadata: Metadata = {
  title: "Termos de Uso – PromoPost",
  description: "Termos de Uso da PromoPost.",
  alternates: { canonical: "/termos-de-uso/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    Promise.resolve([]),
  ]);
  return (
    <PageShell current="/termos-de-uso/">
      <PaginaTermos apoio={apoio} destaque={destaque} texto={termos} />
    </PageShell>
  );
}
