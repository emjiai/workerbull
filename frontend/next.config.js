/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove experimental appDir (not needed for Next.js 14)
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ui-avatars.com',
        },
      ],
    },
    // Add this for better Vercel compatibility
    output: 'standalone',
  }
  
  module.exports = nextConfig