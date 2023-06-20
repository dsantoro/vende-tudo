/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.datocms-assets.com"],
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
