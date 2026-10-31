import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// Self-hosted at build time by next/font. Display and body are preloaded because
// the hero headline and intro are above the fold; the mono face is not.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`;
