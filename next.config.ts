import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    reactCompiler: {
      compilationMode: 'all'
    }
  }
}

export default nextConfig
