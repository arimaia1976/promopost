import type { Metadata } from "next";
import "./site.css";
import "./ajustes.css";

const isPreview = process.env.SITE_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://promopost.com.br"),
  title: "PromoPost – As top promoções de Alphaville",
  description: "As melhores promoções de Alphaville e região.",
  icons: { icon: "/images/Favicon.png" },
  robots: isPreview
    ? { index: false, follow: false }
    : { index: true, follow: true, "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="elementor-kit-8">{children}</body>
    </html>
  );
}
