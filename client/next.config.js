/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/books',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
