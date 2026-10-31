import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DimensionLine } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { ArtCard } from "@/features/martial-arts/ArtCard";
import { martialArtsQuery, martialArtsTags } from "@/features/martial-arts/queries";
import { contactLink, routes } from "@/lib/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Martial arts",
  description:
    "Kung Fu, Silambam and Varmakalai: how training alongside the work shapes the way I build systems.",
};

export default async function MartialArtsPage() {
  const { intro, arts } = await sanityFetch({ query: martialArtsQuery, tags: martialArtsTags });
  if (arts.length === 0) notFound();

  const firstYear = Math.min(...arts.map((art) => art.startYear ?? Infinity));
  const lead =
    intro ??
    (Number.isFinite(firstYear)
      ? `Training alongside the career since ${firstYear}. Each art is tied to one behaviour I bring to engineering.`
      : "Training alongside the career. Each art is tied to one behaviour I bring to engineering.");

  return (
    <Container className="py-section">
      <header className="mb-14 flex max-w-3xl flex-col gap-4 md:mb-20">
        <Eyebrow>Martial arts</Eyebrow>
        <Heading as="h1">Training alongside the work</Heading>
        <p className="type-lead text-muted">{lead}</p>
        {Number.isFinite(firstYear) ? (
          <DimensionLine className="mt-4 w-full max-w-xl">Training since {firstYear}</DimensionLine>
        ) : null}
      </header>

      <ul className="grid gap-6 lg:grid-cols-2">
        {arts.map((art) => (
          <li key={art._id} className="reveal flex">
            <ArtCard art={art} />
          </li>
        ))}
      </ul>

      <footer className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
        <ButtonLink href={contactLink.href} arrow="right">
          {contactLink.label}
        </ButtonLink>
        {routes.about.live ? (
          <ButtonLink href={routes.about.href} variant="text" arrow="right">
            About me
          </ButtonLink>
        ) : null}
      </footer>
    </Container>
  );
}
