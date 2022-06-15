/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXTCLOUD_HOST]
  }
}

console.log(nextConfig)

module.exports = nextConfig
