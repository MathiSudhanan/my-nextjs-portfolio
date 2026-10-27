import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Typography";
import { contactLink, cvRoute, primaryNav } from "@/lib/navigation";
import { site } from "@/lib/site";
import { Brand } from "./Brand";

export type FooterLink = { id: string; label: string; href: string };

const linkClass =
  "inline-flex min-h-11 items-center text-fg no-underline transition-colors duration-(--duration-fast) ease-settle hover:text-accent";

type Props = {
  email: string | null;
  socials: readonly FooterLink[];
};

export function Footer({ email, socials }: Props) {
  const explore = cvRoute ? [...primaryNav, cvRoute] : primaryNav;

  return (
    <footer className="mt-section border-t border-line">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div className="flex max-w-sm flex-col gap-4">
          <Brand />
          <p className="text-small text-muted">
            Senior software architect and full-stack engineer. Foundations first, then speed.
          </p>
        </div>

        {explore.length > 0 ? (
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <Eyebrow tone="muted">Explore</Eyebrow>
            <ul className="flex flex-col">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div />
        )}

        <div className="flex flex-col gap-2">
          <Eyebrow tone="muted">Connect</Eyebrow>
          <ul className="flex flex-col">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href={contactLink.href} className={linkClass}>
                Send a message
              </Link>
            </li>
            {socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.label}
                  <Icon name="arrow-up-right" className="ml-1" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-1 py-6 text-small text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Built with Next.js and Sanity</p>
        </Container>
      </div>
    </footer>
  );
}
