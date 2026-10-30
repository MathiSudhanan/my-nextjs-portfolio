import { CaseCard } from "@/components/ui/CaseCard";
import { Section } from "@/components/ui/Layout";
import { routes } from "@/lib/navigation";
import { resolveImage } from "@/lib/sanity/image";
import type { HomeProfileQueryResult } from "@/sanity.types";

type Study = NonNullable<NonNullable<HomeProfileQueryResult>["featured"]>[number];

export function SelectedWork({ studies }: { studies: readonly Study[] }) {
  if (studies.length === 0) return null;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      heading="Flagship case studies"
      description="Systems I designed, and the decisions behind them."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {studies.map((study, index) => (
          <div
            key={study._id}
            className={`reveal ${studies.length === 3 && index === 2 ? "lg:col-span-2" : ""}`}
          >
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
              // Link only once the case study route exists.
              href={routes.architecture.live ? `${routes.architecture.href}/${study.slug}` : null}
              layout={studies.length === 3 && index === 2 ? "wide" : "stacked"}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
