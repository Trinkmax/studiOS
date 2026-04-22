import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-neon-300 to-neon-500 text-ink-950 shadow-[0_10px_30px_-10px_rgba(36,224,140,0.6),0_0_0_1px_rgba(255,255,255,0.12)_inset] hover:shadow-[0_14px_40px_-8px_rgba(36,224,140,0.8),0_0_0_1px_rgba(255,255,255,0.18)_inset] hover:-translate-y-0.5",
  secondary:
    "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.07] hover:border-white/15 hover:-translate-y-0.5",
  ghost:
    "text-mist-300 hover:text-white hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function CTAButton({
  variant = "primary",
  size = "md",
  icon = true,
  href,
  className,
  children,
  ...rest
}: BaseProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const content = (
    <>
      <span className="relative z-[1]">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-[1] h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      )}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(80% 80% at 50% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
