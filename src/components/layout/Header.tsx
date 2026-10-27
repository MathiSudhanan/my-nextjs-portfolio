import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { contactLink, cvLink, primaryNav } from "@/lib/navigation";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="header-hairline sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={primaryNav} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink href={cvLink.href} variant="text" className="px-3 no-underline">
              {cvLink.label}
            </ButtonLink>
            <ButtonLink href={contactLink.href}>{contactLink.label}</ButtonLink>
          </div>
          <MobileMenu items={primaryNav} cv={cvLink} contact={contactLink} />
        </div>
      </Container>
    </header>
  );
}
