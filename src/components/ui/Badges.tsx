import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border border-line px-2 py-1",
        "font-mono text-label leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type Status = "available" | "booking" | "unavailable";

const statusDot: Record<Status, string> = {
  available: "bg-signal",
  booking: "bg-gold",
  unavailable: "bg-muted",
};

/** Availability indicator. Static on purpose: a pulsing dot reads as anxious. */
export function StatusPill({
  status = "available",
  className,
  children,
}: {
  status?: Status;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("inline-flex items-center gap-2 font-mono text-label text-muted", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", statusDot[status])} />
      {children}
    </p>
  );
}

/**
 * A measurement drawn like an architectural dimension line. The label must state
 * something true (years, team size, scale), never decoration.
 */
export function DimensionLine({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const tick = <span aria-hidden="true" className="h-3 w-px shrink-0 bg-line-strong" />;
  const rule = <span aria-hidden="true" className="h-px min-w-3 flex-1 bg-line-strong" />;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {tick}
      {rule}
      <span className="type-label text-center text-muted">{children}</span>
      {rule}
      {tick}
    </div>
  );
}
