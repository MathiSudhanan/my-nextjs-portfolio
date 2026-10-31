import { DimensionLine } from "@/components/ui/Badges";
import { Container } from "@/components/ui/Layout";

/** Facts that are computed from the CMS, never typed in. The stacks are the positioning. */
export function ProofStrip({ yearsLabel, organisations }: { yearsLabel: string; organisations: number }) {
  return (
    <section aria-label="Experience at a glance" className="pb-4">
      <Container>
        <DimensionLine className="reveal">
          {yearsLabel} · {organisations} organisations · .NET · Java · TypeScript
        </DimensionLine>
      </Container>
    </section>
  );
}
