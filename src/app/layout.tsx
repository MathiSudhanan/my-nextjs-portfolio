import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, type FooterLink } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { sanityFetch } from "@/lib/sanity/fetch";
import { socialsQuery, socialsTags } from "@/lib/sanity/queries";
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

async function getSocials(): Promise<FooterLink[]> {
  const socials = await sanityFetch({ query: socialsQuery, tags: socialsTags });
  return socials.flatMap((social) =>
    social.title && social.url?.startsWith("https://")
      ? [{ id: social._id, label: social.title, href: social.url }]
      : [],
  );
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const socials = await getSocials();

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer socials={socials} />
      </body>
    </html>
  );
}
