import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

const LOGO_W = 866;
const LOGO_H = 245;

export function Logo({
  className,
  variant = "light",
  priority = false,
}: {
  className?: string;
  variant?: Variant;
  priority?: boolean;
}) {
  const src =
    variant === "dark"
      ? "/media/studios-logo-dark.png"
      : "/media/studios-logo-light.png";
  return (
    <Image
      src={src}
      alt="studiOS"
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      className={cn("h-5 w-auto select-none sm:h-[22px]", className)}
      style={{ height: undefined, width: "auto" }}
    />
  );
}

/** Small square badge fallback (used when only an icon is wanted). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#5eecaa" />
          <stop offset="1" stopColor="#24e08c" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0a0c10" />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="15"
        stroke="rgba(255,255,255,0.08)"
      />
      <path
        d="M20 26c0-4.4 3.6-8 8-8h4a8 8 0 010 16h-4a4 4 0 000 8h12"
        stroke="url(#lg)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="45" cy="42" r="3.5" fill="url(#lg)" />
    </svg>
  );
}
