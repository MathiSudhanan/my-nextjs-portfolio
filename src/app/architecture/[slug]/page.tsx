import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Tag } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { DecisionRecordCard } from "@/features/architecture/DecisionRecordCard";
import { RichText } from "@/features/architecture/RichText";
import { getCaseStudy, getCaseStudySlugs } from "@/features/architecture/data";
import { SAMPLE_SLUG } from "@/features/architecture/sample";
import { resolveImage } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.seo?.metaTitle ?? study.title,
    description: study.seo?.metaDescription ?? study.summary,
    robots: study.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

function Panel({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-10">
      <Heading as="h2" id={`${id}-heading`} className="mb-6">
        {title}
      </Heading>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const hero = resolveImage(study.heroImage);
  const eyebrow = [study.domain, study.period].filter(Boolean).join(" · ");
  const facts = [
    ["Role", study.role],
    ["Team", study.teamSize ? `${study.teamSize} people` : null],
    ["Duration", study.duration],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  const hasRichText = (value: readonly unknown[] | null) => Boolean(value?.length);

  // Order is the story: situation, design, outcome. Empty sections drop out of the page and the contents.
  const sections: { id: string; title: string; body: ReactNode }[] = [
    { id: "problem", title: "Problem", body: <RichText value={study.problem} /> },
    ...(hasRichText(study.context)
      ? [{ id: "context", title: "Context", body: <RichText value={study.context} /> }]
      : []),
    ...(study.constraints?.length
      ? [
          {
            id: "constraints",
            title: "Constraints",
            body: (
              <ul className="max-w-prose list-disc space-y-2 pl-6 text-fg marker:text-accent">
                {study.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(hasRichText(study.leadership)
      ? [{ id: "leadership", title: "Leadership", body: <RichText value={study.leadership} /> }]
      : []),
    { id: "architecture", title: "Architecture", body: <RichText value={study.architecture} /> },
    ...(study.technologyDecisions?.length
      ? [
          {
            id: "decisions",
            title: "Technology decisions",
            body: (
              <div className="grid gap-6">
                {study.technologyDecisions.map((record) => (
                  <DecisionRecordCard key={record._key} record={record} />
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(study.tradeOffs?.length
      ? [
          {
            id: "trade-offs",
            title: "Trade-offs",
            body: (
              <ul className="grid gap-4 md:grid-cols-2">
                {study.tradeOffs.map((tradeOff) => (
                  <li
                    key={tradeOff._key}
                    className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6"
                  >
                    <p className="font-medium text-fg-strong">{tradeOff.choice}</p>
                    {tradeOff.gained ? (
                      <p className="text-fg">
                        <span className="type-label block text-signal">Gained</span>
                        {tradeOff.gained}
                      </p>
                    ) : null}
                    {tradeOff.gaveUp ? (
                      <p className="text-fg">
                        <span className="type-label block text-gold">Gave up</span>
                        {tradeOff.gaveUp}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(
      [
        ["data-flow", "Data flow", study.dataFlow],
        ["security", "Security", study.security],
        ["scalability", "Scalability", study.scalability],
        ["performance", "Performance", study.performance],
        ["deployment", "Deployment", study.deployment],
      ] as const
    )
      .filter(([, , value]) => hasRichText(value))
      .map(([id, title, value]) => ({ id, title, body: <RichText value={value} /> })),
    { id: "lessons", title: "Lessons learned", body: <RichText value={study.lessons} /> },
  ];

  return (
    <Container className="py-section">
      {slug === SAMPLE_SLUG ? (
        <p
          role="note"
          className="mb-10 rounded-card border border-gold/60 p-4 text-small text-fg"
        >
          <span className="type-label mr-2 text-gold">Sample</span>
          This is a fictional case study used to review the template. It is hidden in production.
        </p>
      ) : null}

      <header className="flex max-w-4xl flex-col gap-5">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading as="h1">{study.title}</Heading>
        <p className="type-lead text-fg-strong">{study.outcome}</p>
        <p className="type-lead text-muted">{study.summary}</p>
        <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
          {facts.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="type-label text-muted">{label}</dt>
              <dd className="text-fg-strong">{value}</dd>
            </div>
          ))}
        </dl>
        {study.confidential ? (
          <p className="text-small text-muted">The client is described generically at their request.</p>
        ) : null}
        {study.techStack?.length ? (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {study.techStack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {hero ? (
        <figure className="mt-12 flex flex-col gap-3">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            placeholder={hero.blurDataURL ? "blur" : "empty"}
            blurDataURL={hero.blurDataURL}
            className="h-auto w-full rounded-card border border-line"
          />
          {study.heroImage.caption ? (
            <figcaption className="text-small text-muted">{study.heroImage.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}

      {study.metrics?.length ? (
        <section aria-labelledby="outcomes-heading" className="mt-12">
          <h2 id="outcomes-heading" className="type-label mb-4 text-muted">
            Measured outcomes
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {study.metrics.map((metric) => (
              <li
                key={metric._key}
                className="flex flex-col gap-2 rounded-card border border-line bg-surface p-6"
              >
                <p className="text-fg">{metric.label}</p>
                <p className="type-data text-3xl text-fg-strong">
                  {metric.before ? (
                    <>
                      <span className="text-muted line-through decoration-1">{metric.before}</span>
                      <span aria-hidden="true" className="px-2 text-accent">→</span>
                      <span className="sr-only"> to </span>
                    </>
                  ) : null}
                  {metric.after}
                </p>
                <p className="text-small text-muted">Source: {metric.source}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 grid gap-x-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 flex flex-col gap-3 border-l border-line pl-4 text-small">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted hover:text-accent">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="min-w-0">
          {sections.map((section) => (
            <Panel key={section.id} id={section.id} title={section.title}>
              {section.body}
            </Panel>
          ))}
        </div>
      </div>

      <footer className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
        <ButtonLink href="/architecture" variant="text">
          All case studies
        </ButtonLink>
        <ButtonLink href="/contact" arrow="right">
          Discuss a similar problem
        </ButtonLink>
      </footer>
    </Container>
  );
}
