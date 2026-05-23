/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better dev experience
  reactStrictMode: true,

  // Image optimisation domains
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features
  experimental: {
    // Server Actions are stable in Next 14 — keep off unless needed
  },

  // Compress responses
  compress: true,

  // Custom headers for security + performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  // API body parser config for image uploads
  // (handled per-route with export const config)
  webpack(config) {
    return config
  },
}

export default nextConfig
