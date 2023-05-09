/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.pexels.com', 'quick-chop.nyc3.digitaloceanspaces.com'],
  },
}

module.exports = nextConfig
