import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site palette, repeated here because ImageResponse cannot read CSS variables.
const colors = { bg: "#0B1221", surface: "#111827", text: "#E2E8F0", muted: "#94A3B8", accent: "#00D9FF" };

export default function Image() {
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
          {site.brand.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", color: colors.text, fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", color: colors.muted, fontSize: 38 }}>{site.role}</div>
        </div>
        <div style={{ display: "flex", color: colors.muted, fontSize: 28 }}>
          .NET · Java · TypeScript · Foundations first, then speed
        </div>
      </div>
    ),
    size,
  );
}
