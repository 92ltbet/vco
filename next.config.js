/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  },
  // Tắt webpack cache
  webpack: (config, { dev, isServer }) => {
    // Chỉ tắt cache trên production build
    if (!dev && isServer) {
      config.cache = false;
    }
    
    // Giảm kích thước bundle
    if (!dev) {
      config.optimization.minimize = true;
    }
    
    return config;
  },
  // Hạn chế kích thước output
  outputFileTracing: false,
  // Thêm cấu hình cho Cloudflare Pages
  experimental: {
    optimizeCss: true,
    serverActions: true,
  },
  // nextjs strict mode
  reactStrictMode: true,
};

module.exports = nextConfig; 