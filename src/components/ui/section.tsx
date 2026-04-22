import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  innerClassName,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36",
        className
      )}
    >
      <div className={cn("relative z-10 mx-auto max-w-7xl", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionKicker({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-mist-300",
        className
      )}
    >
      {icon && <span className="text-neon-400">{icon}</span>}
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl",
        className
      )}
    >
      {children}
    </As>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-2xl text-pretty text-lg leading-relaxed text-mist-300 sm:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
