import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mandala } from "@/components/patterns/Mandala";
import { CaseCard } from "@/components/ui/CaseCard";
import { Tag, StatusPill, DimensionLine } from "@/components/ui/Badges";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";

// Living style guide. Visible in development and on Vercel preview deployments;
// hidden on the production site.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "bg", value: "#0B1221", use: "Page background", contrast: "base", swatch: "bg-bg" },
  { token: "surface", value: "#111827", use: "Cards, figures", contrast: "base", swatch: "bg-surface" },
  { token: "raised", value: "#172033", use: "Hover and raised surfaces", contrast: "base", swatch: "bg-raised" },
  { token: "fg", value: "#CBD5E1", use: "Body text", contrast: "12.6:1 on bg", swatch: "bg-fg" },
  { token: "fg-strong", value: "#E2E8F0", use: "Headings, strong text", contrast: "15.2:1", swatch: "bg-fg-strong" },
  { token: "muted", value: "#94A3B8", use: "Secondary text", contrast: "7.3:1", swatch: "bg-muted" },
  { token: "accent", value: "#00D9FF", use: "Links, focus, primary action", contrast: "11.0:1", swatch: "bg-accent" },
  { token: "gold", value: "#C8A15B", use: "Martial Arts page only", contrast: "7.8:1", swatch: "bg-gold" },
  { token: "signal", value: "#34D399", use: "Availability dot only", contrast: "9.7:1", swatch: "bg-signal" },
  { token: "danger", value: "#F87171", use: "Form errors", contrast: "6.8:1", swatch: "bg-danger" },
] as const;

const icons: IconName[] = [
  "arrow-right",
  "arrow-down",
  "arrow-up-right",
  "menu",
  "close",
  "copy",
  "check",
  "mail",
];

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="type-label text-muted">{title}</h3>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <>
      {/* Hero composition: the direction in miniature, without the portrait. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pattern-grid absolute inset-0 -z-10 opacity-60" />
        <Mandala className="absolute -right-24 top-1/2 -z-10 w-[44rem] max-w-none -translate-y-1/2 text-accent/10" />
        <Container className="flex flex-col items-start gap-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <StatusPill>Open to Principal and Architect roles</StatusPill>
          <Eyebrow>Senior software architect</Eyebrow>
          <Heading as="h1" size="display" className="max-w-5xl">
            Engineering systems with discipline.
          </Heading>
          <p className="type-lead text-fg">
            20+ years designing and leading .NET, Spring Boot and React/Next.js systems. Foundations
            first. Then speed.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <ButtonLink href="/contact" size="lg" arrow="right">
              Get in touch
            </ButtonLink>
            <ButtonLink href="#colour" variant="text" arrow="down">
              See the system
            </ButtonLink>
          </div>
          <DimensionLine className="mt-10 w-full max-w-3xl">20+ years · 3 stacks · 1 discipline</DimensionLine>
        </Container>
      </section>

      <Section
        id="colour"
        eyebrow="Colour"
        heading="Dark only, one accent"
        description="Cyan is used flat for links, focus and the primary action. Gold appears on the Martial Arts page. Contrast figures are for text on the bg colour."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {colors.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-card border border-line bg-surface">
              <div className={`${c.swatch} h-20 border-b border-line`} />
              <div className="flex flex-col gap-1 p-4">
                <p className="font-medium text-fg-strong">{c.token}</p>
                <p className="font-mono text-label text-muted">{c.value}</p>
                <p className="text-small">{c.use}</p>
                <p className="font-mono text-label text-muted">{c.contrast}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" eyebrow="Typography" heading="Archivo, Plex Sans, Plex Mono">
        <div className="flex flex-col divide-y divide-line">
          {[
            ["Display", "type-display", "Hold the form."],
            ["H1", "type-h1", "Monolith to modular platform"],
            ["H2", "type-h2", "Selected architecture work"],
            ["H3", "type-h3", "Decisions and trade-offs"],
          ].map(([name, cls, sample]) => (
            <div key={name} className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="type-label text-muted">{name}</p>
              <p className={`${cls} text-fg-strong`}>{sample}</p>
            </div>
          ))}
          <div className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="type-label text-muted">Lead</p>
            <p className="type-lead">
              Checkout ran on a twelve-year-old monolith. Every release needed a weekend freeze.
            </p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="type-label text-muted">Body</p>
            <p className="max-w-[62ch]">
              Body copy is 16px on a 1.7 line height at a 62 character measure. Plex Sans stays
              legible across a long case study, and the secondary tone is reserved for
              supporting text.
            </p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="type-label text-muted">Label</p>
            <p className="type-label text-accent">Case 01 · Logistics · 2023–24</p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="type-label text-muted">Data</p>
            <p className="type-data text-3xl text-fg-strong">1.8s → 240ms</p>
          </div>
        </div>
      </Section>

      <Section id="controls" eyebrow="Components" heading="Controls and badges">
        <div className="grid gap-12 md:grid-cols-2">
          <Block title="Buttons">
            <div className="flex flex-wrap items-center gap-4">
              <Button arrow="right">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="text" arrow="right">
                Text link
              </Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg" arrow="right">
                Large primary
              </ButtonLink>
              <ButtonLink href="https://github.com/MathiSudhanan" variant="outline">
                External link
              </ButtonLink>
            </div>
          </Block>

          <Block title="Badges">
            <div className="flex flex-wrap gap-2">
              <Tag>.NET 8</Tag>
              <Tag>Next.js</Tag>
              <Tag>Spring Boot</Tag>
              <Tag>PostgreSQL</Tag>
            </div>
            <div className="flex flex-col gap-3">
              <StatusPill status="available">Open to Principal and Architect roles</StatusPill>
              <StatusPill status="booking">Booking consulting from January</StatusPill>
              <StatusPill status="unavailable">Not available</StatusPill>
            </div>
          </Block>

          <Block title="Form field (control border is 3:1)">
            <label htmlFor="ds-email" className="type-label text-muted">
              Email
            </label>
            <input
              id="ds-email"
              type="email"
              placeholder="you@company.com"
              className="min-h-11 rounded-control border border-line-strong bg-surface px-4 text-fg-strong placeholder:text-muted focus-visible:border-accent"
            />
          </Block>

          <Block title="Icons">
            <ul className="flex flex-wrap gap-4 text-fg-strong">
              {icons.map((name) => (
                <li key={name} className="flex w-20 flex-col items-center gap-2">
                  <Icon name={name} className="size-6" />
                  <span className="font-mono text-label text-muted">{name}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </Section>

      <Section id="space" eyebrow="Space and shape" heading="4px base, 8px rhythm">
        <div className="grid gap-12 md:grid-cols-2">
          <Block title="Spacing scale (Tailwind units × 4px)">
            <ul className="flex flex-col gap-2">
              {spacing.map((n) => (
                <li key={n} className="grid grid-cols-[6.5rem_1fr] items-center gap-4">
                  <span className="font-mono text-label text-muted">
                    {n} · {n * 4}px
                  </span>
                  <span className="h-2 bg-accent/70" style={{ width: `${n * 4}px` }} />
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Radius and surfaces">
            <div className="flex flex-wrap gap-4">
              <div className="grid h-24 w-32 place-items-center rounded-control border border-line bg-surface text-small">
                4px control
              </div>
              <div className="grid h-24 w-32 place-items-center rounded-card border border-line bg-surface text-small">
                8px card
              </div>
              <div className="grid h-24 w-32 place-items-center rounded-card border border-line bg-raised text-small">
                raised
              </div>
            </div>
            <p className="text-small text-muted">No drop shadows. Depth comes from surface steps and hairlines.</p>
          </Block>
        </div>
      </Section>

      <Section
        id="case-card"
        eyebrow="Components"
        heading="Case card"
        description="Example content only. The real cards come from the Case study documents in Sanity."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <CaseCard
            title="Monolith to modular platform"
            outcome="Cut checkout p95 from 1.8 s to 240 ms while still shipping weekly."
            summary="Split a twelve-year-old .NET Framework monolith into modules without pausing releases."
            role="Lead architect"
            domain="Logistics"
            period="2023–24"
            teamSize={11}
            techStack={[".NET", "Next.js", "SQL Server", "Azure"]}
            href={null}
          />
          <CaseCard
            title="Real-time pricing engine"
            outcome="Reprices 40,000 SKUs in under two seconds."
            summary="An event-driven Spring Boot service with a React operations console."
            role="Tech lead"
            domain="Retail"
            period="2021–22"
            techStack={["Spring Boot", "Kafka", "React"]}
            href={null}
          />
        </div>
      </Section>

      <Section id="patterns" eyebrow="Patterns" heading="Circular geometry and a drafting grid">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative isolate grid h-72 place-items-center overflow-hidden rounded-card border border-line bg-surface">
            <Mandala className="size-[130%] max-w-none text-accent/20" />
            <p className="type-label relative text-muted">Mandala at 20%</p>
          </div>
          <div className="relative isolate grid h-72 place-items-center overflow-hidden rounded-card border border-line bg-surface">
            <div aria-hidden="true" className="pattern-grid absolute inset-0" />
            <p className="type-label relative text-muted">Grid, 48px module</p>
          </div>
        </div>
      </Section>
    </>
  );
}
