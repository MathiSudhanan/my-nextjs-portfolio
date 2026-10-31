import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Approach } from "@/features/home/Approach";
import { CareerPath } from "@/features/home/CareerPath";
import { getHomeData } from "@/features/home/data";
import { Hero } from "@/features/home/Hero";
import { Leadership } from "@/features/home/Leadership";
import { ProofStrip } from "@/features/home/ProofStrip";
import { SelectedWork } from "@/features/home/SelectedWork";
import { WorkWithMe } from "@/features/home/WorkWithMe";
import { Writing } from "@/features/home/Writing";
import { describeAvailability } from "@/lib/availability";
import { routes } from "@/lib/navigation";
import { personSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { resolveImage } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery, siteSettingsTags } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: site.title, description: site.description, url: "/" },
};

export default async function HomePage() {
  const [home, settings] = await Promise.all([
    getHomeData(),
    sanityFetch({ query: siteSettingsQuery, tags: siteSettingsTags }),
  ]);
  if (!settings) throw new Error('Sanity has no "siteSettings" document. Create it in the Studio.');
  const availability = describeAvailability(settings.availability);

  return (
    <>
      <JsonLd data={personSchema((settings.socials ?? []).map((social) => social.url))} />
      <Hero
        headline={home.profile.headline}
        subheadline={home.profile.subheadline}
        positioning={home.profile.positioning}
        availability={availability}
        photo={resolveImage(home.profile.heroImage)}
        hasWork={home.featured.length > 0}
      />
      <ProofStrip yearsLabel={home.yearsLabel} organisations={home.organisations} />
      <SelectedWork studies={home.featured} />
      <Approach />
      <CareerPath stages={home.careerPath} />
      <Leadership quotes={home.quotes} />
      <Writing
        articles={home.articles}
        total={home.articleTotal}
        hrefFor={routes.writing.live ? (slug) => `${routes.writing.href}/${slug}` : null}
      />
      <WorkWithMe
        availability={availability}
        email={settings.email}
        cvUrl={settings.cvUrl}
      />
    </>
  );
}
