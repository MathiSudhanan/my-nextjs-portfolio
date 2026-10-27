import Image from "next/image";
import Link from "next/link";
import { Mandala } from "@/components/patterns/Mandala";
import { cn } from "@/lib/cn";
import type { ResolvedImage } from "@/lib/sanity/image";
import { Icon } from "./Icon";
import { Tag } from "./Badges";

export type CaseCardProps = {
  title: string;
  outcome: string;
  summary: string;
  role: string;
  domain?: string | null;
  period?: string | null;
  teamSize?: number | null;
  techStack?: readonly string[] | null;
  image?: ResolvedImage | null;
  /** Null renders a card with no link (the case study page is not live yet). */
  href: string | null;
  /** "wide" puts the figure beside the text from the lg breakpoint up. */
  layout?: "stacked" | "wide";
};

/**
 * A flagship case study. Everything is readable at rest: hover only adds a border
 * colour, it never reveals content, so phones see the same card.
 */
export function CaseCard({
  title,
  outcome,
  summary,
  role,
  domain,
  period,
  teamSize,
  techStack,
  image,
  href,
  layout = "stacked",
}: CaseCardProps) {
  const eyebrow = [domain, period].filter(Boolean).join(" · ");
  const facts = [role, teamSize ? `Team of ${teamSize}` : null].filter(Boolean).join(" · ");

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface",
        "transition-colors duration-(--duration-base) ease-settle hover:border-accent/40",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent",
        layout === "wide" && "lg:grid lg:grid-cols-[1.1fr_1fr]",
      )}
    >
      <div
        className={cn(
          "relative isolate aspect-[16/10] w-full overflow-hidden border-b border-line bg-bg",
          layout === "wide" && "lg:aspect-auto lg:min-h-full lg:border-b-0 lg:border-r",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            sizes={layout === "wide" ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
            className="size-full object-cover"
            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
          />
        ) : (
          <>
            <div aria-hidden="true" className="pattern-grid absolute inset-0" />
            <Mandala className="absolute left-1/2 top-1/2 -z-10 size-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 text-accent/15" />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        {eyebrow ? <p className="type-label text-muted">{eyebrow}</p> : null}
        <h3 className="type-h3 text-fg-strong">
          {href ? (
            <Link
              href={href}
              className="no-underline outline-none after:absolute after:inset-0 after:content-['']"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="font-medium text-fg-strong">{outcome}</p>
        <p className="text-muted">{summary}</p>
        {facts ? <p className="type-label text-muted">{facts}</p> : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {techStack?.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          {href ? (
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent"
            >
              Read the case
              <Icon name="arrow-right" className="transition-transform duration-(--duration-fast) ease-settle group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
