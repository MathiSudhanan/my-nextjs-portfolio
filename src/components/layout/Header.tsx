import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { contactLink, cvRoute, primaryNav } from "@/lib/navigation";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  // Until other routes exist the header is just the brand and the Contact button,
  // visible at every width. The menu appears once there is something to put in it.
  const hasMenu = primaryNav.length > 0;

  return (
    <header className="header-hairline sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Brand />

        {hasMenu ? (
          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks items={primaryNav} />
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <div className={hasMenu ? "hidden items-center gap-2 md:flex" : "flex items-center gap-2"}>
            {cvRoute ? (
              <ButtonLink href={cvRoute.href} variant="text" className="px-3 no-underline">
                {cvRoute.label}
              </ButtonLink>
            ) : null}
            <ButtonLink href={contactLink.href}>{contactLink.label}</ButtonLink>
          </div>
          {hasMenu ? <MobileMenu items={primaryNav} cv={cvRoute} contact={contactLink} /> : null}
        </div>
      </Container>
    </header>
  );
}
