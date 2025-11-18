import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Terminal Reimagined - Code Meets Reality',
    short_name: 'Terminal Reimagined',
    description: 'Where command line interfaces transcend into holographic 3D experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f0d',
    theme_color: '#0DBC79',
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
