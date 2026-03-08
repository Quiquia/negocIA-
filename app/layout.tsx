import type { Metadata } from "next";
import "./globals.css";
import { SalaryDataProvider } from "./providers/SalaryDataProvider";
import { LayoutShell } from "./LayoutShell";

export const metadata: Metadata = {
  title: "NegocIA+ | Empoderamiento Financiero con IA",
  description:
    "NegocIA+ analiza tu perfil profesional, identifica brechas salariales y te ayuda a negociar con confianza.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <SalaryDataProvider>
          <LayoutShell>{children}</LayoutShell>
        </SalaryDataProvider>
      </body>
    </html>
  );
}
