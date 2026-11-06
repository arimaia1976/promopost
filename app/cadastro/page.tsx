import type { Metadata } from "next";
import { PaginaCadastro } from "@/components/pages/Cadastro";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cadastro – PromoPost",
  description:
    "Cadastre-se na PromoPost e receba as melhores promoções de Alphaville e região.",
  alternates: { canonical: "/cadastro/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    Promise.resolve([]),
  ]);
  return (
    <PageShell current="/cadastro/">
      <PaginaCadastro apoio={apoio} destaque={destaque} texto={""} />
    </PageShell>
  );
}
