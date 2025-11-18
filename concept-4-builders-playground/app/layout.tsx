import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Builder's Playground - Constructing Digital Dreams | Creative Software Development",
  description: 'Where software development meets creative construction. Building amazing digital experiences, one block at a time. Playful, innovative, and powerful web solutions.',
  keywords: ['software construction', 'creative development', 'web applications', 'digital builder', 'playful design', 'innovative solutions', 'builders playground', 'creative coding'],
  authors: [{ name: "Builder's Playground Team" }],
  creator: "Builder's Playground",
  publisher: "Builder's Playground",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://buildersplayground.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Builder's Playground - Constructing Digital Dreams",
    description: 'Where software development meets creative construction. Building amazing digital experiences, one block at a time.',
    url: 'https://buildersplayground.dev',
    siteName: "Builder's Playground",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Builder's Playground - Constructing Digital Dreams",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Builder's Playground - Constructing Digital Dreams",
    description: 'Where software development meets creative construction. Building amazing digital experiences, one block at a time.',
    images: ['/og-image.jpg'],
    creator: '@buildersplay',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#F59E0B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
