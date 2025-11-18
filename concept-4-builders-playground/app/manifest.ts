import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Builder's Playground - Constructing Digital Dreams",
    short_name: "Builder's Playground",
    description: 'Where software development meets creative construction. Building amazing digital experiences, one block at a time.',
    start_url: '/',
    display: 'standalone',
    background_color: '#87CEEB',
    theme_color: '#F59E0B',
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
