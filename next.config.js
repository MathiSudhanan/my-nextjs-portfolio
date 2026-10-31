/** @type {import('next').NextConfig} */

// The Content-Security-Policy runs in REPORT-ONLY mode: browsers log what it would block
// (see the console) but nothing is blocked. Once a full pass shows no violations, switch the
// header name to "Content-Security-Policy". Static pages cannot use per-request nonces, so
// inline scripts and styles are allowed; everything else is limited to this site and the
// Sanity image CDN.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: csp },
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
