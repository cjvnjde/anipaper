/** @type {import("next").NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: '0a428092f0e3c504cae8f24b4177e94b',
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
    fallbacks: {
      document: "/pages/offline.tsx",
    },
  },
};

module.exports = withPWA(nextConfig);
