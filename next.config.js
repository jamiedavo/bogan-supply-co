/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/collections/mens", destination: "/collections/petrolheads", permanent: true },
      { source: "/collections/womens", destination: "/collections/rock-dogs", permanent: true },
      { source: "/collections/kids", destination: "/collections/sheilas", permanent: true },
    ];
  },
};

module.exports = nextConfig;
