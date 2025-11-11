import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Binpar Pokédex",
  description: "Prueba técnica - Pokédex T3 + tRPC + PokéAPI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <TRPCReactProvider>
          <div className="mx-auto max-w-6xl px-4 py-6">
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}