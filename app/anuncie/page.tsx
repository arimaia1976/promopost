import type { Metadata } from "next";
import { PaginaAnuncie } from "@/components/pages/Anuncie";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Anuncie – PromoPost",
  description:
    "Anuncie na PromoPost Ads e apareça para mais de 330 mil pessoas que moram, trabalham e consomem em Alphaville e região.",
  alternates: { canonical: "/anuncie/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    getAnunciantes(true),
  ]);
  return (
    <PageShell current="/anuncie/">
      <PaginaAnuncie apoio={apoio} destaque={destaque} texto={""} />
    </PageShell>
  );
}
