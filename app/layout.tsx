import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "./LayoutShell";
import { LanguageProvider } from "./providers/LanguageProvider";
import { SalaryDataProvider } from "./providers/SalaryDataProvider";

export const metadata: Metadata = {
  title: {
    default:
      "NegocIA+ | Herramienta de Negociación Salarial con IA para Mujeres en Tech",
    template: "%s | NegocIA+",
  },
  description:
    "Analiza tu salario, identifica brechas salariales de género y practica negociaciones con IA. Herramienta gratuita para mujeres en tecnología en Latinoamérica.",
  keywords: [
    "negociación salarial",
    "brecha salarial",
    "mujeres en tecnología",
    "salario tech",
    "brecha de género",
    "negociar salario",
    "salario programadora",
    "IA negociación",
    "Latinoamérica tech",
    "comparar salarios",
    "simulador negociación",
  ],
  authors: [{ name: "NegocIA+" }],
  openGraph: {
    title: "NegocIA+ | Negociación Salarial con IA para Mujeres en Tech",
    description:
      "Analiza tu salario, identifica brechas y practica negociaciones con IA. Gratis para mujeres en tech en LATAM.",
    type: "website",
    locale: "es_LA",
    siteName: "NegocIA+",
  },
  twitter: {
    card: "summary_large_image",
    title: "NegocIA+ | Negociación Salarial con IA",
    description:
      "Herramienta gratuita de análisis salarial y simulación de negociaciones para mujeres en tech.",
  },
  icons: {
    icon: "/assets/logo.jpg",
    shortcut: "/assets/logo.jpg",
    apple: "/assets/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <SalaryDataProvider>
            <LayoutShell>{children}</LayoutShell>
          </SalaryDataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
