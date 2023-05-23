/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

module.exports = nextConfig;
