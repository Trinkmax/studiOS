"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative border-t border-white/5 bg-ink-950/60 backdrop-blur px-5 sm:px-8 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist-400">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink href="https://instagram.com" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://youtu.be/VTb9aPFzyZw" label="YouTube">
                <Youtube className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="mailto:hola@studios.app" label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterCol
            title={t.footer.product}
            links={[
              ["Face ID", "#face-id"],
              [t.nav.modules[1].label, "#panel"],
              [t.nav.modules[2].label, "#crm"],
              [t.nav.modules[4].label, "#finanzas"],
              ["Reviews", "#resenas"],
            ]}
          />
          <FooterCol
            title={t.footer.company}
            links={[
              ["Monaco Barber", "https://www.google.com/search?q=monaco+barber+córdoba"],
              [t.footer.history, "#top"],
              [t.footer.careers, "#"],
              [t.footer.contact, "mailto:hola@studios.app"],
            ]}
          />
          <FooterCol
            title={t.footer.legal}
            links={[
              [t.footer.terms, "#"],
              [t.footer.privacy, "#"],
              [t.footer.cookies, "#"],
            ]}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-mist-500">
          <span>© {new Date().getFullYear()} studiOS · Growth Intelligence</span>
          <span className="tracking-[0.2em] uppercase">
            {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.15em] text-mist-400">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-mist-300 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-mist-300 transition-all hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
    >
      {children}
    </Link>
  );
}
