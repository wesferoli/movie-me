/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MOVIE_DB_TOKEN: process.env.MOVIE_DB_TOKEN,
  },
};

module.exports = nextConfig;
