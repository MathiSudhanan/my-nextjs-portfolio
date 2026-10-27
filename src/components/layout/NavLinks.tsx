"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/navigation";

type Props = {
  items: readonly NavItem[];
  variant?: "bar" | "stack";
  onNavigate?: () => void;
};

// Client component only because the active link depends on the current URL.
export function NavLinks({ items, variant = "bar", onNavigate }: Props) {
  const pathname = usePathname() ?? "";

  return (
    <ul className={cn(variant === "bar" ? "flex items-center gap-1" : "flex flex-col gap-1")}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-flex items-center no-underline transition-colors duration-(--duration-fast) ease-settle",
                variant === "bar"
                  ? "min-h-11 rounded-control px-3 text-[0.9375rem]"
                  : "type-h2 min-h-14 py-2",
                active ? "text-accent" : "text-fg hover:text-fg-strong",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
