import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Neural Nexus - AI-Powered Development',
    short_name: 'Neural Nexus',
    description: 'Where artificial intelligence meets human creativity. Building the future with neural-powered software solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a14',
    theme_color: '#00F0FF',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
