/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals.push({ canvas: "commonjs canvas" });
    return config;
  },
};

module.exports = nextConfig;