"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { dict, type Dictionary } from "./dictionaries";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: dict[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  // Fallback to Spanish when the component is rendered outside a LocaleProvider
  // (e.g. product pages that haven't been wrapped). Keeps existing Spanish-only
  // routes working without forcing every page to wire the provider.
  if (!ctx) return { locale: "es", t: dict.es };
  return ctx;
}
