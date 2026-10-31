import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export type ButtonVariant = "primary" | "outline" | "text";
export type ButtonSize = "md" | "lg";
type Arrow = "right" | "down";

type Shared = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds an arrow that moves 4px on hover. */
  arrow?: Arrow;
  className?: string;
  children: ReactNode;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control font-medium " +
  "transition-colors duration-(--duration-fast) ease-settle " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  outline: "border border-line-strong text-fg-strong hover:border-accent hover:text-accent",
  text: "text-fg-strong underline decoration-accent/55 underline-offset-4 hover:text-accent hover:decoration-accent",
};

// Touch targets are at least 44px tall; the large size is 52px for primary actions.
const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 text-[0.9375rem]",
  lg: "min-h-13 text-base",
};

const padding: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { md: "px-5", lg: "px-6" },
  outline: { md: "px-5", lg: "px-6" },
  text: { md: "px-0", lg: "px-0" },
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<Shared, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], padding[variant][size], className);
}

function ArrowIcon({ arrow }: { arrow: Arrow }) {
  return (
    <Icon
      name={arrow === "right" ? "arrow-right" : "arrow-down"}
      className={cn(
        "transition-transform duration-(--duration-fast) ease-settle motion-reduce:transition-none",
        arrow === "right"
          ? "group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          : "group-hover:translate-y-1 motion-reduce:group-hover:translate-y-0",
      )}
    />
  );
}

type ButtonProps = Shared & Omit<ComponentProps<"button">, keyof Shared>;

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow ? <ArrowIcon arrow={arrow} /> : null}
    </button>
  );
}

type ButtonLinkProps = Shared & { href: string } & Omit<ComponentProps<"a">, keyof Shared | "href">;

const isExternal = (href: string) => /^https?:\/\//.test(href);
const isPlainAnchor = (href: string) => href.startsWith("#") || href.startsWith("mailto:");

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow ? <ArrowIcon arrow={arrow} /> : null}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
        <Icon name="arrow-up-right" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (isPlainAnchor(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
