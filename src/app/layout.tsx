import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CommandPalette } from "@/components/command-palette";

export const metadata: Metadata = {
  title: "studiOS — Tu barbería, en piloto automático",
  description:
    "Reconocimiento facial, CRM, finanzas y sistema operativo para barberías modernas. Face ID check-in, automatización de reseñas en Google Maps y panel de barberos en tiempo real.",
  keywords: [
    "software barbería",
    "CRM barbería",
    "face id barbería",
    "reconocimiento facial",
    "sistema barbería argentina",
    "studiOS",
  ],
  openGraph: {
    title: "studiOS — Tu barbería, en piloto automático",
    description:
      "Reconocimiento facial, CRM y finanzas en un solo sistema. Pedí tu demo.",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className="dark">
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
