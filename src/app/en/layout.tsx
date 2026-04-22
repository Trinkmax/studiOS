import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://studios.com.ar";

export const metadata: Metadata = {
  title: {
    default: "studiOS — Your barbershop, on autopilot",
    template: "%s · studiOS",
  },
  description:
    "Face recognition, CRM, finance and operating system for modern barbershops. Face ID check-in, automated Google Maps reviews and a real-time barber panel.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "es-AR": SITE_URL,
      en: `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: "studiOS — Your barbershop, on autopilot",
    description:
      "Face recognition, CRM and finance in a single system. Request a demo.",
    url: `${SITE_URL}/en`,
    siteName: "studiOS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "studiOS — Your barbershop, on autopilot",
    description: "Face recognition, CRM and finance in a single system.",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
