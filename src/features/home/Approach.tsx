import { Section } from "@/components/ui/Layout";

// Each principle pairs a martial-arts idea with the engineering behaviour it stands for.
const principles = [
  {
    term: "Stance",
    title: "Foundations first",
    body: "Pipelines, observability and contracts exist before the first feature. Speed comes from stability.",
  },
  {
    term: "Form",
    title: "Patterns practised until boring",
    body: "Templates, conventions and decision records make the right path the easy path.",
  },
  {
    term: "Distance",
    title: "Boundaries before coupling",
    body: "Decide what each part of the system must never know about the others.",
  },
  {
    term: "Timing",
    title: "Sequenced change over big bangs",
    body: "Strangler migrations, feature flags and reversible steps. No rewrite weekends.",
  },
  {
    term: "Restraint",
    title: "Saying no as a design tool",
    body: "The strongest move is often to add nothing: boring technology, fewer services, deleted code.",
  },
] as const;

export function Approach() {
  return (
    <Section
      id="approach"
      eyebrow="Approach"
      heading="Form before speed"
      description="Architecture and martial arts teach the same thing: build a stable stance, practise patterns until they are automatic, control distance, then move fast."
    >
      <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
        {principles.map((principle, index) => (
          <li key={principle.term} className="reveal flex flex-col gap-3 bg-surface p-6">
            <p className="type-label text-accent">
              <span className="text-muted">{String(index + 1).padStart(2, "0")} </span>
              {principle.term}
            </p>
            <h3 className="text-lg font-semibold text-fg-strong">{principle.title}</h3>
            <p className="text-muted">{principle.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
