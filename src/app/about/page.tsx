import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { aboutQuery, aboutTags } from "@/features/about/queries";
import { RichText } from "@/features/architecture/RichText";
import { CareerPath } from "@/features/home/CareerPath";
import { contactLink, routes } from "@/lib/navigation";
import { resolveImage } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/fetch";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "A full-stack architect with 20+ years of practice: how I work, how I lead and what shaped both.",
  path: "/about",
});

export default async function AboutPage() {
  const profile = await sanityFetch({ query: aboutQuery, tags: aboutTags });
  if (!profile) notFound();

  const portrait = resolveImage(profile.portrait);
  const careerPath = (profile.careerPath ?? []).filter(
    (stage): stage is typeof stage & { years: string; role: string } => Boolean(stage.years && stage.role),
  );
  const leadership = (profile.leadership ?? []).filter((item) => item.title);

  return (
    <>
      <Container className="py-section">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>About</Eyebrow>
            <Heading as="h1">Foundations first, then speed</Heading>
            {profile.aboutStory?.length ? (
              <div className="text-lg">
                <RichText value={profile.aboutStory} />
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <ButtonLink href={contactLink.href} arrow="right">
                {contactLink.label}
              </ButtonLink>
              {routes.experience.live ? (
                <ButtonLink href={routes.experience.href} variant="text" arrow="right">
                  See my experience
                </ButtonLink>
              ) : null}
            </div>
          </div>

          {portrait ? (
            <figure className="flex max-w-xs flex-col gap-3 lg:max-w-none">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 1024px) 320px, 320px"
                placeholder={portrait.blurDataURL ? "blur" : "empty"}
                blurDataURL={portrait.blurDataURL}
                className="aspect-[4/5] w-full rounded-card border border-line object-cover"
                style={portrait.objectPosition ? { objectPosition: portrait.objectPosition } : undefined}
              />
              {profile.portrait?.caption ? (
                <figcaption className="text-small text-muted">{profile.portrait.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </Container>

      <CareerPath stages={careerPath} />

      {leadership.length > 0 ? (
        <section aria-labelledby="lead-heading" className="py-section">
          <Container>
            <header className="mb-10 flex max-w-prose flex-col gap-4 md:mb-14">
              <Eyebrow>Leadership</Eyebrow>
              <Heading as="h2" id="lead-heading">
                How I lead
              </Heading>
            </header>
            <ul className="grid gap-6 md:grid-cols-2">
              {leadership.map((item) => (
                <li
                  key={item._key}
                  className="reveal flex flex-col gap-3 rounded-card border border-line bg-surface p-6 md:p-8"
                >
                  <h3 className="type-h3 text-fg-strong">{item.title}</h3>
                  {item.story ? <p className="text-muted">{item.story}</p> : null}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
