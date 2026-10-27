export type NavItem = { label: string; href: string };

// Routes arrive in later phases; the header and footer are built for the final set.
// Articles joins `primaryNav` once three articles are published.
export const primaryNav: readonly NavItem[] = [
  { label: "Architecture", href: "/architecture" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Martial Arts", href: "/martial-arts" },
];

export const cvLink: NavItem = { label: "CV", href: "/cv" };
export const contactLink: NavItem = { label: "Contact", href: "/contact" };
