import type { Metadata } from "next";
import { StatusPill } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { CopyField } from "@/components/ui/CopyField";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { describeAvailability } from "@/lib/availability";
import { pageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery, siteSettingsTags } from "@/lib/sanity/queries";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch about a senior architecture role or a consulting engagement.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await sanityFetch({ query: siteSettingsQuery, tags: siteSettingsTags });
  if (!settings) throw new Error('Sanity has no "siteSettings" document. Create it in the Studio.');

  const availability = describeAvailability(settings.availability);
  const place = [settings.location?.city, settings.location?.country].filter(Boolean).join(", ");
  const where = [place, settings.location?.timezone].filter(Boolean).join(" · ");

  return (
    <Container className="py-section">
      <div className="flex max-w-3xl flex-col items-start gap-6">
        <Eyebrow>Contact</Eyebrow>
        <Heading as="h1">Let&rsquo;s talk about the problem</Heading>
        <p className="type-lead text-muted">
          Email is the quickest way. Tell me about the role or the system, and the timeline.
        </p>
        {availability ? <StatusPill status={availability.status}>{availability.label}</StatusPill> : null}

        <div className="mt-4 flex flex-col items-start gap-4 border-t border-line pt-8">
          <CopyField value={settings.email} label="email" />
          <ButtonLink href={`mailto:${settings.email}`} size="lg" arrow="right">
            Write an email
          </ButtonLink>
        </div>

        {where ? <p className="text-muted">{where}</p> : null}

        {settings.socials?.length || settings.cvUrl ? (
          <ul className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-6">
            {settings.cvUrl ? (
              <li>
                <ButtonLink href={settings.cvUrl} variant="text">
                  Download CV
                </ButtonLink>
              </li>
            ) : null}
            {settings.socials?.map((social) => (
              <li key={social._key}>
                <ButtonLink href={social.url} variant="text">
                  {social.title}
                </ButtonLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Container>
  );
}
