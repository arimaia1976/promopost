import type { Metadata } from "next";
import { PaginaSobre } from "@/components/pages/Sobre";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre – PromoPost",
  description:
    "Conheça a PromoPost Alphaville: as melhores promoções de Alphaville e região para consumidores e anunciantes.",
  alternates: { canonical: "/sobre/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    Promise.resolve([]),
  ]);
  return (
    <PageShell current="/sobre/">
      <PaginaSobre apoio={apoio} destaque={destaque} texto={""} />
    </PageShell>
  );
}
