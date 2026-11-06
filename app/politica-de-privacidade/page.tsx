import type { Metadata } from "next";
import { PaginaPrivacidade } from "@/components/pages/Privacidade";
import { PageShell } from "@/components/layout/PageShell";
import { getAnunciantes, getBanners } from "@/lib/content";
import { privacidade } from "@/content/legais";

export const metadata: Metadata = {
  title: "Política de Privacidade – PromoPost",
  description: "Política de Privacidade da PromoPost.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default async function Page() {
  const [apoio, destaque] = await Promise.all([
    getBanners("apoio"),
    Promise.resolve([]),
  ]);
  return (
    <PageShell current="/politica-de-privacidade/">
      <PaginaPrivacidade
        apoio={apoio}
        destaque={destaque}
        texto={privacidade}
      />
    </PageShell>
  );
}
