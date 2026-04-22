"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

const WaitlistModal = dynamic(
  () => import("./waitlist-modal").then((m) => m.WaitlistModal),
  { ssr: false }
);

type WaitlistContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen]
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      {isOpen ? <WaitlistModal onClose={close} /> : null}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}
