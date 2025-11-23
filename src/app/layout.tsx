import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "MetaFlow - Treino Fitness Personalizado",
  description: "Plataforma de treino fitness com IA personalizada",
  manifest: "/manifest.json",
  themeColor: "#4A5F7A",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MetaFlow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
