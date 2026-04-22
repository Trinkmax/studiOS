"use client";

import { Marquee } from "@/components/ui/marquee";
import { Store } from "lucide-react";

const items = [
  "Monaco Barber · Rondeau",
  "Monaco Barber · Paraná",
  "Monaco Barber · Caseros",
  "+30 barberías en onboarding",
  "Córdoba · Argentina",
  "Face ID en 2s",
  "WhatsApp + Instagram oficial",
  "iOS · Android · Web",
];

export function LogosStrip() {
  return (
    <div className="relative border-y border-white/5 bg-ink-950/60 py-6">
      <Marquee speed={50}>
        {items.map((t) => (
          <div
            key={t}
            className="flex shrink-0 items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-mist-400"
          >
            <Store className="h-3 w-3 text-neon-300" />
            {t}
            <span className="ml-8 text-mist-700">·</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
