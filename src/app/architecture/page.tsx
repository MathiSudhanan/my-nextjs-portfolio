import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/ui/CaseCard";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { getCaseStudies } from "@/features/architecture/data";
import { pageMetadata } from "@/lib/seo";
import { resolveImage } from "@/lib/sanity/image";

export const metadata: Metadata = pageMetadata({
  title: "Architecture",
  description:
    "Case studies in system design: the problem, the constraints, the decisions and what they cost.",
  path: "/architecture",
});

export default async function ArchitecturePage() {
  const studies = await getCaseStudies();
  // Nothing to show yet: a 404 is more honest than an empty page.
  if (studies.length === 0) notFound();

  return (
    <Container className="py-section">
      <header className="mb-12 flex max-w-3xl flex-col gap-4 md:mb-16">
        <Eyebrow>Architecture</Eyebrow>
        <Heading as="h1">Systems I designed, and the decisions behind them</Heading>
        <p className="type-lead text-muted">
          Each case study states the problem, the constraints, the options I rejected and what the
          decision cost.
        </p>
      </header>

      <ul className="grid gap-6 lg:grid-cols-2">
        {studies.map((study) => (
          <li key={study._id} className="flex">
            <div className="flex w-full flex-col">
              <CaseCard
                title={study.title}
                outcome={study.outcome}
                summary={study.summary}
                role={study.role}
                domain={study.domain}
                period={study.period}
                teamSize={study.teamSize}
                techStack={study.techStack}
                image={resolveImage(study.heroImage)}
                href={`/architecture/${study.slug}`}
                headingLevel="h2"
              />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
