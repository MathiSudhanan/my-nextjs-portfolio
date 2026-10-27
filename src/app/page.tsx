import { CtaBand } from "@/features/home/CtaBand";
import { getHomeData } from "@/features/home/data";
import { Hero } from "@/features/home/Hero";
import { ProofStrip } from "@/features/home/ProofStrip";
import { SelectedWork } from "@/features/home/SelectedWork";
import { describeAvailability } from "@/lib/availability";
import { resolveImage } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery, siteSettingsTags } from "@/lib/sanity/queries";

export default async function HomePage() {
  const [home, settings] = await Promise.all([
    getHomeData(),
    sanityFetch({ query: siteSettingsQuery, tags: siteSettingsTags }),
  ]);
  const availability = describeAvailability(settings?.availability);

  return (
    <>
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
      <CtaBand availability={availability} cvUrl={settings?.cvUrl ?? null} />
    </>
  );
}
