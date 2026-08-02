import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FIX #7: Optimize Next.js Image component — serve AVIF/WebP automatically
  // and cache optimized images for 1 year.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },

  // FIX #7: Add long-lived cache headers for all static assets in /sequence and /models.
  // These files are immutable (content never changes for a given filename),
  // so the browser can cache them indefinitely — zero re-download on repeat visits.
  async headers() {
    return [
      {
        // All 240 sequence frames — immutable, cache for 1 year
        source: "/sequence/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 3D model files and textures — immutable
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Watch face and macro images — cache for 1 week (may update)
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/macro/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
