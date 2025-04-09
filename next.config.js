/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    runtime: 'edge',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.otruyenapi.com',
        port: '',
        pathname: '/uploads/comics/**',
      },
      {
        protocol: 'https',
        hostname: 'sv1.otruyencdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.vencomic.com',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true,
  }
};

module.exports = nextConfig; 