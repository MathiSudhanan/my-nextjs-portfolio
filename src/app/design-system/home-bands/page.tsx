import { notFound } from "next/navigation";
import { CareerPath } from "@/features/home/CareerPath";
import { Leadership } from "@/features/home/Leadership";
import { Writing } from "@/features/home/Writing";

// Preview of the data-gated home bands with sample props, so their layout can be
// reviewed before the content exists. Hidden in production like the rest of /design-system.
export default function HomeBandsPreview() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <>
      <CareerPath
        stages={[
          { _key: "1", years: "Sample years", role: "Engineer", practice: "Sample stage", lesson: "Sample lesson: what this stage taught." },
          { _key: "2", years: "Sample years", role: "Tech lead", practice: "Sample stage", lesson: "Sample lesson: what this stage taught." },
          { _key: "3", years: "Sample years", role: "Architect", practice: "Sample stage", lesson: "Sample lesson: what this stage taught." },
          { _key: "4", years: "Sample years", role: "Principal", practice: "Sample stage", lesson: "Sample lesson: what this stage taught." },
        ]}
      />
      <Leadership
        quotes={[
          { _id: "q1", quote: "Sample quote. Replace with a real, permitted testimonial.", name: "Sample Name", role: "Sample role", company: "Sample company" },
          { _id: "q2", quote: "Sample quote. Replace with a real, permitted testimonial.", name: "Sample Name", role: "Sample role", company: "Sample company" },
        ]}
      />
      <Writing
        total={3}
        hrefFor={null}
        articles={[
          { _id: "a1", title: "Sample decision record title", slug: "a", kind: "adr", publishedAt: "2026-09-01T00:00:00Z" },
          { _id: "a2", title: "Sample essay title", slug: "b", kind: "essay", publishedAt: "2026-08-01T00:00:00Z" },
          { _id: "a3", title: "Another sample essay title", slug: "c", kind: "essay", publishedAt: "2026-07-01T00:00:00Z" },
        ]}
      />
    </>
  );
}
