/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "silent-capybara-536.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
