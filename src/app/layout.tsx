import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CommandPalette } from "@/components/command-palette";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://studios.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "studiOS — Tu barbería, en piloto automático",
    template: "%s · studiOS",
  },
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
  authors: [{ name: "studiOS" }],
  creator: "studiOS",
  openGraph: {
    title: "studiOS — Tu barbería, en piloto automático",
    description:
      "Reconocimiento facial, CRM y finanzas en un solo sistema. Pedí tu demo.",
    url: SITE_URL,
    siteName: "studiOS",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "studiOS — Tu barbería, en piloto automático",
    description:
      "Reconocimiento facial, CRM y finanzas en un solo sistema.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <Analytics />
      </body>
    </html>
  );
}
