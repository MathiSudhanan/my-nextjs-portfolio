/** @type {import('next').NextConfig} */

// A Content-Security-Policy is deliberately not set yet: it will be added in
// report-only mode once the final scripts, fonts and styles are known.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Sanity's CDN resizes images (see src/lib/sanity/image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/sanity/image-loader.ts",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
