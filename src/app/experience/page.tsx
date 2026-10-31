import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { experienceQuery, experienceTags } from "@/features/experience/queries";
import { Timeline } from "@/features/experience/Timeline";
import { contactLink } from "@/lib/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles from software engineer to senior application architect: what I owned, what I shipped and the technologies I used.",
};

export default async function ExperiencePage() {
  const roles = await sanityFetch({ query: experienceQuery, tags: experienceTags });
  if (roles.length === 0) notFound();

  return (
    <Container className="py-section">
      <header className="mb-14 flex max-w-3xl flex-col gap-4 md:mb-20">
        <Eyebrow>Experience</Eyebrow>
        <Heading as="h1">Where I have worked, and what I owned</Heading>
        <p className="type-lead text-muted">
          Roles from engineer to architect, newest first, with the technologies used in each.
        </p>
      </header>

      <Timeline roles={roles} />

      <footer className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
        <ButtonLink href={contactLink.href} arrow="right">
          {contactLink.label}
        </ButtonLink>
      </footer>
    </Container>
  );
}
