export type NavItem = { label: string; href: string };
type Route = NavItem & { live: boolean };

// Flip `live` to true when a route ships. The header, footer and cards only link to
// live routes, so a half-built site never shows a dead link.
export const routes = {
  architecture: { label: "Architecture", href: "/architecture", live: true },
  experience: { label: "Experience", href: "/experience", live: true },
  about: { label: "About", href: "/about", live: true },
  martialArts: { label: "Martial Arts", href: "/martial-arts", live: false },
  writing: { label: "Writing", href: "/writing", live: false },
  contact: { label: "Work with me", href: "/contact", live: true },
} satisfies Record<string, Route>;

// Articles join the primary navigation once three are published.
export const primaryNav: readonly NavItem[] = [
  routes.architecture,
  routes.experience,
  routes.about,
  routes.martialArts,
].filter((route) => route.live);

export const contactLink: NavItem = routes.contact;
