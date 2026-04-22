"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";
import { useLocale } from "@/lib/i18n/locale-context";

export function MobileFloatingCta() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const waitlist = useWaitlist();
  const { t } = useLocale();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 360);
  });

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={{
        y: visible ? 0 : 120,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 bottom-3 z-40 flex justify-center md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        type="button"
        onClick={waitlist.open}
        className="group inline-flex w-full max-w-md items-center justify-between rounded-full bg-gradient-to-b from-neon-300 to-neon-500 px-5 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_18px_40px_-10px_rgba(36,224,140,0.55),0_0_0_1px_rgba(255,255,255,0.12)_inset]"
      >
        <span>{t.mobileCta}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}
