import Link from "next/link";
import { Section } from "@/components/ui/Layout";

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  kind: "essay" | "adr";
  publishedAt: string;
};

const kindLabel = { essay: "Essay", adr: "Decision record" } as const;

type Props = {
  articles: readonly ArticleSummary[];
  /** How many articles are published in total. The band needs three. */
  total: number;
  /** Null until the writing route ships, so rows never link to a dead page. */
  hrefFor: ((slug: string) => string) | null;
};

/** Thinking in public. Hidden until three articles are published. */
export function Writing({ articles, total, hrefFor }: Props) {
  if (total < 3 || articles.length === 0) return null;

  return (
    <Section id="writing" eyebrow="Writing" heading="Notes and decision records">
      <ul className="divide-y divide-line border-y border-line">
        {articles.map((article) => {
          const date = new Date(article.publishedAt).toLocaleDateString("en", {
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          });
          const href = hrefFor?.(article.slug);
          return (
            <li key={article._id} className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <h3 className="text-lg font-medium text-fg-strong">
                {href ? (
                  <Link href={href} className="underline-offset-4 hover:text-accent hover:underline">
                    {article.title}
                  </Link>
                ) : (
                  article.title
                )}
              </h3>
              <p className="type-label text-muted">
                {kindLabel[article.kind]} · {date}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
