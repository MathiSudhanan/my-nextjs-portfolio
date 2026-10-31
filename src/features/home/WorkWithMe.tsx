import { StatusPill } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { CopyField } from "@/components/ui/CopyField";
import { Section } from "@/components/ui/Layout";
import type { AvailabilityDisplay } from "@/lib/availability";
import { contactLink } from "@/lib/navigation";

type Props = {
  availability: AvailabilityDisplay | null;
  email: string;
  cvUrl: string | null;
};

function Offer({
  label,
  title,
  children,
  action,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <li className="reveal flex flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-colors duration-(--duration-base) ease-settle hover:border-accent/40 md:p-8">
      <p className="type-label text-accent">{label}</p>
      <h3 className="type-h3 text-fg-strong">{title}</h3>
      <div className="flex flex-col gap-3 text-muted">{children}</div>
      <div className="mt-auto flex flex-col items-start gap-3 pt-2">{action}</div>
    </li>
  );
}

/** One band, three intents. Each card has a single clear action. */
export function WorkWithMe({ availability, email, cvUrl }: Props) {
  return (
    <Section id="work-with-me" eyebrow="Work with me" heading="Three ways to start">
      {availability ? <StatusPill status={availability.status} className="-mt-6 mb-8">{availability.label}</StatusPill> : null}
      <ul className="grid gap-6 lg:grid-cols-3">
        <Offer
          label="Hire"
          title="Principal / Architect"
          action={
            cvUrl ? (
              <ButtonLink href={cvUrl} size="lg" arrow="right">
                Download CV
              </ButtonLink>
            ) : (
              <ButtonLink href={`mailto:${email}?subject=Role`} size="lg" arrow="right">
                Email me about a role
              </ButtonLink>
            )
          }
        >
          <p>A senior architecture or engineering leadership role, remote-first.</p>
          <CopyField value={email} label="email" compact />
        </Offer>

        <Offer
          label="Consult"
          title="Architecture review"
          action={
            <ButtonLink
              href={`mailto:${email}?subject=Architecture%20review`}
              size="lg"
              variant="outline"
              arrow="right"
            >
              Email about a review
            </ButtonLink>
          }
        >
          <p>A focused look at an existing system: where it is fragile, and what to change first.</p>
        </Offer>

        <Offer
          label="Advise"
          title="Fractional CTO"
          action={
            <ButtonLink href={contactLink.href} size="lg" variant="outline" arrow="right">
              Start a conversation
            </ButtonLink>
          }
        >
          <p>Architecture guidance for a team: decisions, reviews and mentoring over a longer period.</p>
          <p className="type-label">Reply in 1 business day</p>
        </Offer>
      </ul>
    </Section>
  );
}
