import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  }
  // Remove react compiler because it was breaking shit
  // experimental: {
  //   reactCompiler: {
  //     compilationMode: 'all'
  //   }
  // }
}

export default nextConfig
