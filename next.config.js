/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://performance-feedback-server-blush.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
