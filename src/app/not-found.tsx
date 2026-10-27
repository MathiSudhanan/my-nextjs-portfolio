import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export default function NotFound() {
  return (
    <Container className="py-section">
      <div className="flex max-w-2xl flex-col items-start gap-6">
        <Eyebrow>404</Eyebrow>
        <Heading as="h1">This page doesn&rsquo;t exist</Heading>
        <p className="type-lead text-muted">
          The link may be old, or the page may not have been built yet.
        </p>
        <ButtonLink href="/" size="lg" arrow="right">
          Back to the home page
        </ButtonLink>
      </div>
    </Container>
  );
}
