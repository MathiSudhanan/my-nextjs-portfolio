import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingStyle = "display" | "h1" | "h2" | "h3";

const styleFor: Record<HeadingStyle, string> = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
};

type HeadingProps = {
  /** The semantic level. */
  as?: HeadingLevel;
  /** The visual style, when it differs from the semantic level. */
  size?: HeadingStyle;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Heading({ as: Tag = "h2", size, id, className, children }: HeadingProps) {
  const style = size ?? (Tag === "h1" ? "h1" : Tag);
  return (
    <Tag id={id} className={cn(styleFor[style], "text-fg-strong", className)}>
      {children}
    </Tag>
  );
}

type EyebrowProps = {
  tone?: "accent" | "muted" | "gold";
  className?: string;
  children: ReactNode;
};

const tones = { accent: "text-accent", muted: "text-muted", gold: "text-gold" } as const;

export function Eyebrow({ tone = "accent", className, children }: EyebrowProps) {
  return <p className={cn("type-label", tones[tone], className)}>{children}</p>;
}
