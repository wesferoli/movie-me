import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    MOVIE_DB_TOKEN: process.env.MOVIE_DB_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
