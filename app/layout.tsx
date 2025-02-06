import ClientProvider from "./components/ClientProvider";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google"
import "./globals.css";

const orbitron = Orbitron({subsets:["latin"]})

export const metadata: Metadata = {
  title: "speed typer",
  description:"Typer Speed est un jeu de dactylographie développé avec Next.js. Teste ta rapidité et ta précision en tapant des textes le plus vite possible. Parfait pour améliorer tes compétences en frappe et défier tes amis !",
  icons: {
    icon:'/logo.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${orbitron.className}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
