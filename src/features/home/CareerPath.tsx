import { Section } from "@/components/ui/Layout";

export type CareerStage = {
  _key: string;
  years: string;
  role: string;
  practice?: string | null;
  lesson?: string | null;
};

/** Career as a training progression. Hidden until there are at least two stages. */
export function CareerPath({ stages }: { stages: readonly CareerStage[] }) {
  if (stages.length < 2) return null;

  return (
    <Section
      id="path"
      eyebrow="The path"
      heading="Career as a training progression"
      description="Twenty years of practice, in software and on the mat. The order matters: the body first, then tools, then sharper tools, and finally the judgement that needs none."
    >
      <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {stages.map((stage) => (
          <li key={stage._key} className="reveal flex flex-col gap-3 bg-surface p-6">
            <p className="type-label text-accent">{stage.years}</p>
            <h3 className="text-lg font-semibold text-fg-strong">{stage.role}</h3>
            {stage.practice ? <p className="type-label text-muted">{stage.practice}</p> : null}
            {stage.lesson ? <p className="text-muted">{stage.lesson}</p> : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
