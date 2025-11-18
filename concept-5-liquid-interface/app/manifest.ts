import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Liquid Interface - Fluid Digital Experiences',
    short_name: 'Liquid Interface',
    description: 'Where design flows like water. Organic, adaptive, alive.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f23',
    theme_color: '#A855F7',
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
