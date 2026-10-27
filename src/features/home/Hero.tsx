import Image from "next/image";
import { Mandala } from "@/components/patterns/Mandala";
import { StatusPill } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import type { AvailabilityDisplay } from "@/lib/availability";
import { contactLink } from "@/lib/navigation";
import type { ResolvedImage } from "@/lib/sanity/image";
import { site } from "@/lib/site";
import { HeroDiagram } from "./HeroDiagram";

type Props = {
  headline: string;
  subheadline?: string | null;
  positioning?: string | null;
  availability: AvailabilityDisplay | null;
  /** The Silambam photograph. Without it the hero is typographic, with the diagram. */
  photo: ResolvedImage | null;
  /** Show a "see the work" link only when the section below exists. */
  hasWork: boolean;
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function Hero({ headline, subheadline, positioning, availability, photo, hasWork }: Props) {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pattern-grid absolute inset-0 -z-10 opacity-50" />
      <Mandala className="absolute -right-32 top-1/2 -z-10 hidden w-[46rem] max-w-none -translate-y-1/2 text-accent/10 lg:block" />

      <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          {availability ? (
            <StatusPill status={availability.status} className="animate-fade">
              {availability.label}
            </StatusPill>
          ) : null}
          <Eyebrow className="animate-fade" >{site.role}</Eyebrow>
          <Heading
            as="h1"
            size="display"
            id="hero-heading"
            className="animate-rise max-w-4xl"
          >
            {headline}
          </Heading>
          {subheadline ? (
            <p className="type-lead animate-rise text-fg-strong" style={delay(120)}>
              {subheadline}
            </p>
          ) : null}
          {positioning ? (
            <p className="type-lead animate-rise text-muted" style={delay(180)}>
              {positioning}
            </p>
          ) : null}
          <div className="animate-rise flex flex-wrap items-center gap-x-6 gap-y-3 pt-2" style={delay(240)}>
            <ButtonLink href={contactLink.href} size="lg" arrow="right">
              Get in touch
            </ButtonLink>
            {hasWork ? (
              <ButtonLink href="#work" variant="text" arrow="down">
                See selected work
              </ButtonLink>
            ) : null}
          </div>

          {photo ? (
            // One element for every size: in flow on phones, a faded backdrop from lg up.
            <div className="relative mt-4 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card border border-line lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:mt-0 lg:aspect-auto lg:w-1/2 lg:max-w-none lg:rounded-none lg:border-0 photo-fade-left">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 384px"
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
                className="object-cover"
                style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
              />
            </div>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md">
          <HeroDiagram className="h-auto w-full" />
        </div>
      </Container>
    </section>
  );
}
