/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/collections/petrolheads",
        destination: "/collections/mens",
        permanent: true,
      },
      {
        source: "/collections/rock-dogs",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/collections/sheilas",
        destination: "/collections/womens",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
