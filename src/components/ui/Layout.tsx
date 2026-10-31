import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow, Heading } from "./Typography";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("page-gutter mx-auto w-full max-w-page", className)}>{children}</div>;
}

type SectionProps = {
  id?: string;
  eyebrow?: string;
  heading?: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/** A page band: consistent vertical rhythm and a labelled landmark. */
export function Section({ id, eyebrow, heading, description, className, children }: SectionProps) {
  const headingId = id && heading ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-section", className)}>
      <Container>
        {eyebrow || heading || description ? (
          <header className="mb-10 flex max-w-prose flex-col gap-4 md:mb-14">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading ? (
              <Heading as="h2" id={headingId}>
                {heading}
              </Heading>
            ) : null}
            {description ? <p className="type-lead text-muted">{description}</p> : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
