import ClientProvider from "./components/ClientProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dirane-speed-typer",
  description:
    "Typer Speed est un jeu de dactylographie développé avec Next.js. Teste ta rapidité et ta précision en tapant des textes le plus vite possible. Parfait pour améliorer tes compétences en frappe et défier tes amis !",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
