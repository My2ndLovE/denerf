import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital Forge - Crafting Innovation | Expert Software Development',
  description: 'Where code meets craftsmanship. We forge digital products with precision and passion. Expert web development, 3D experiences, and innovative software solutions.',
  keywords: ['software development', 'web development', '3D web experiences', 'innovation', 'digital forge', 'custom software', 'Three.js', 'React development'],
  authors: [{ name: 'Digital Forge Team' }],
  creator: 'Digital Forge',
  publisher: 'Digital Forge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://digitalforge.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Digital Forge - Crafting Innovation',
    description: 'Where code meets craftsmanship. We forge digital products with precision and passion.',
    url: 'https://digitalforge.dev',
    siteName: 'Digital Forge',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Forge - Crafting Innovation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Forge - Crafting Innovation',
    description: 'Where code meets craftsmanship. We forge digital products with precision and passion.',
    images: ['/og-image.jpg'],
    creator: '@digitalforge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#FF6B35" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
