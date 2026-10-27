import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Brand({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <Link
      href="/"
      // With the name visible, the visible text is the accessible name.
      aria-label={showName ? undefined : `${site.name}, home`}
      className={cn("inline-flex min-h-11 items-center gap-3 no-underline", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-control border border-fg-strong/70 type-display text-[0.6875rem] tracking-normal text-fg-strong"
      >
        MS
      </span>
      {showName ? (
        <span className="font-medium text-fg-strong">{site.name}</span>
      ) : null}
    </Link>
  );
}
