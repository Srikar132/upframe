import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // allowedDevOrigins: ['192.168.1.13'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
