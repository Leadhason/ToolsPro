/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable all hosts for Replit proxy environment
  experimental: {
    allowedRevalidateHeaderKeys: [],
  },
  // Allow cross-origin requests from Replit domains
  allowedDevOrigins: [
    '*.replit.dev',
    '*.replit.com',
    '*.replit.app',
  ],
  // Configure development server for Replit
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

export default nextConfig
