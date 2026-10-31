import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, type FooterLink } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery, siteSettingsTags } from "@/lib/sanity/queries";
import { site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
};

export const viewport: Viewport = {
  themeColor: "#0B1221",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await sanityFetch({ query: siteSettingsQuery, tags: siteSettingsTags });
  const socials: FooterLink[] = (settings?.socials ?? []).map((social) => ({
    id: social._key,
    label: social.title,
    href: social.url,
  }));

  const cv = settings?.cvUrl ? { label: "CV", href: settings.cvUrl } : null;

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SkipLink />
        <Header cv={cv} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer email={settings?.email ?? null} cv={cv} socials={socials} />
      </body>
    </html>
  );
}
