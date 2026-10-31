import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { resolveImage } from "@/lib/sanity/image";
import type { RichText as RichTextValue } from "@/sanity.types";
import { DecisionRecordCard } from "./DecisionRecordCard";

type Block<T extends RichTextValue[number]["_type"]> = Extract<RichTextValue[number], { _type: T }>;

function Figure({ value }: { value: Block<"figure"> | Block<"diagram"> }) {
  const image = resolveImage({
    asset: value.asset ?? null,
    hotspot: value.hotspot ?? null,
    alt: value.alt,
    decorative: "decorative" in value ? value.decorative : false,
  });
  if (!image) return null;
  const description = value._type === "diagram" ? value.description : null;

  return (
    <figure className="my-10 flex flex-col gap-3">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="h-auto w-full rounded-card border border-line bg-surface"
      />
      {value.caption ? (
        <figcaption className="text-small text-muted">{value.caption}</figcaption>
      ) : null}
      {description ? (
        <details className="text-small text-muted">
          <summary className="cursor-pointer text-fg underline-offset-4 hover:underline">
            Text description of the diagram
          </summary>
          <p className="mt-2 max-w-prose">{description}</p>
        </details>
      ) : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5 text-fg">{children}</p>,
    h3: ({ children }) => <h3 className="type-h3 mb-4 mt-12 text-fg-strong">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 text-lg font-semibold text-fg-strong">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-6 text-lg text-fg-strong">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 marker:text-accent">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-accent">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-fg-strong">{children}</strong>,
    code: ({ children }) => (
      <code className="rounded-control border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-fg-strong underline decoration-accent/55 underline-offset-4 hover:text-accent"
      >
        {children}
      </a>
    ),
  },
  types: {
    figure: ({ value }) => <Figure value={value} />,
    diagram: ({ value }) => <Figure value={value} />,
    decisionRecord: ({ value }) => (
      <div className="my-8">
        <DecisionRecordCard record={value} />
      </div>
    ),
    callout: ({ value }) => (
      <aside
        className={`my-8 rounded-card border p-5 text-fg ${
          value.tone === "warning" ? "border-gold/60" : "border-line-strong"
        }`}
      >
        <p className="type-label mb-2 text-muted">{value.tone === "warning" ? "Warning" : "Note"}</p>
        {value.body}
      </aside>
    ),
    codeSnippet: ({ value }) => (
      <figure className="my-8 overflow-hidden rounded-card border border-line bg-surface">
        {value.filename ? (
          <figcaption className="border-b border-line px-4 py-2 font-mono text-label text-muted">
            {value.filename}
          </figcaption>
        ) : null}
        <pre className="overflow-x-auto p-4 font-mono text-small leading-relaxed text-fg">
          <code>{value.code}</code>
        </pre>
      </figure>
    ),
  },
};

/** Renders a Sanity rich text field. Only h3 and h4 exist in the content, so the page owns h1 and h2. */
export function RichText({ value }: { value: RichTextValue | null | undefined }) {
  if (!value?.length) return null;
  return (
    <div className="max-w-prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
