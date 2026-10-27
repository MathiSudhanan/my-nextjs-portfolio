import { StatusPill } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Typography";
import type { AvailabilityDisplay } from "@/lib/availability";
import { contactLink } from "@/lib/navigation";

type Props = {
  availability: AvailabilityDisplay | null;
  cvUrl: string | null;
};

export function CtaBand({ availability, cvUrl }: Props) {
  return (
    <section aria-labelledby="cta-heading" className="py-section">
      <Container>
        <div className="reveal grid items-center gap-8 rounded-card border border-line bg-surface p-8 md:grid-cols-[1.5fr_1fr] md:p-12">
          <div className="flex flex-col gap-4">
            {availability ? <StatusPill status={availability.status}>{availability.label}</StatusPill> : null}
            <Heading as="h2" id="cta-heading">
              Hiring for a senior role, or need an architecture review?
            </Heading>
            <p className="type-lead text-muted">
              Send a short note about the problem and the timeline.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 md:items-end">
            <ButtonLink href={contactLink.href} size="lg" arrow="right">
              Get in touch
            </ButtonLink>
            {cvUrl ? (
              <ButtonLink href={cvUrl} variant="outline" size="lg">
                Download CV
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
