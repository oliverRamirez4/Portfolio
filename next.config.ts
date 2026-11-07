import type { NextConfig } from "next";
import { buildRewrites, projects } from "./lib/projects";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/experience",
        destination: "/resume",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return buildRewrites(projects);
  },
};

export default nextConfig;
