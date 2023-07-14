/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.iplt20.com",
      },
      {
        protocol: "https",
        hostname: "bcciplayerimages.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
