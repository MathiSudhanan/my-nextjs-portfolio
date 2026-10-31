import { Section } from "@/components/ui/Layout";

export type Quote = {
  _id: string;
  quote: string;
  name: string;
  role?: string | null;
  company?: string | null;
};

/** What other people say. Only quotes with written permission reach this component. */
export function Leadership({ quotes }: { quotes: readonly Quote[] }) {
  if (quotes.length === 0) return null;

  return (
    <Section id="leadership" eyebrow="Leadership" heading="Proof from other people">
      <ul className="grid gap-6 md:grid-cols-2">
        {quotes.map((item) => {
          const byline = [item.role, item.company].filter(Boolean).join(", ");
          return (
            <li key={item._id} className="reveal">
              <figure className="flex h-full flex-col gap-6 rounded-card border border-line bg-surface p-8">
                <blockquote className="text-xl leading-relaxed text-fg-strong">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto text-muted">
                  <span className="font-medium text-fg-strong">{item.name}</span>
                  {byline ? <span>{`, ${byline}`}</span> : null}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
