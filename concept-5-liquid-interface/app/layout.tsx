import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Liquid Interface - Fluid Digital Experiences | Organic Web Design',
  description: 'Where design flows like water. Organic, adaptive, alive. Fluid interfaces, morphing animations, and adaptive digital experiences.',
  keywords: ['liquid interface', 'fluid design', 'organic web design', 'adaptive interfaces', 'morphing animations', 'flowing UI', 'liquid web', 'dynamic design'],
  authors: [{ name: 'Liquid Interface Team' }],
  creator: 'Liquid Interface',
  publisher: 'Liquid Interface',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://liquidinterface.design'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Liquid Interface - Fluid Digital Experiences',
    description: 'Where design flows like water. Organic, adaptive, alive.',
    url: 'https://liquidinterface.design',
    siteName: 'Liquid Interface',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Liquid Interface - Fluid Digital Experiences',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquid Interface - Fluid Digital Experiences',
    description: 'Where design flows like water. Organic, adaptive, alive.',
    images: ['/og-image.jpg'],
    creator: '@liquidui',
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
        <meta name="theme-color" content="#A855F7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
