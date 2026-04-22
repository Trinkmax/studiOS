import { cn } from "@/lib/utils";

export function Pill({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "neon" | "violet" | "amber" | "dim";
}) {
  const tones = {
    default: "bg-white/[0.06] text-mist-200 border-white/10",
    neon: "bg-neon-400/10 text-neon-300 border-neon-400/20",
    violet: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dim: "bg-white/[0.02] text-mist-400 border-white/[0.06]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
