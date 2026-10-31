import { ImageResponse } from "next/og";
import { caseStudyOgQuery, caseStudyTags } from "@/features/architecture/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = { bg: "#0B1221", text: "#E2E8F0", muted: "#94A3B8", accent: "#00D9FF" };

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await sanityFetch({ query: caseStudyOgQuery, params: { slug }, tags: caseStudyTags });

  const eyebrow = ["Case study", study?.domain].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.bg,
          padding: 72,
          borderLeft: `12px solid ${colors.accent}`,
        }}
      >
        <div style={{ display: "flex", color: colors.accent, fontSize: 26, letterSpacing: 6 }}>
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", color: colors.text, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {study?.title ?? "Case study"}
          </div>
          {study?.outcome ? (
            <div style={{ display: "flex", color: colors.muted, fontSize: 34, lineHeight: 1.3 }}>
              {study.outcome}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", color: colors.muted, fontSize: 28 }}>
          {[site.name, study?.role].filter(Boolean).join(" · ")}
        </div>
      </div>
    ),
    size,
  );
}
