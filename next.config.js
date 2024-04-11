/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "miro.medium.com",
      },
      {
        hostname: "source.unsplash.com",
      },
      {
        hostname: "i03.appmifile.com",
      },
    ],
  },
};

module.exports = nextConfig;
