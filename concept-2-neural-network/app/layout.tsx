import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neural Nexus - AI-Powered Development | Intelligent Software Solutions',
  description: 'Where artificial intelligence meets human creativity. Building the future with neural-powered software solutions. Expert AI integration, machine learning, and intelligent automation.',
  keywords: ['AI development', 'neural networks', 'machine learning', 'artificial intelligence', 'intelligent automation', 'AI-powered software', 'neural nexus', 'deep learning'],
  authors: [{ name: 'Neural Nexus Team' }],
  creator: 'Neural Nexus',
  publisher: 'Neural Nexus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://neuralnexus.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Neural Nexus - AI-Powered Development',
    description: 'Where artificial intelligence meets human creativity. Building the future with neural-powered software solutions.',
    url: 'https://neuralnexus.ai',
    siteName: 'Neural Nexus',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neural Nexus - AI-Powered Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Nexus - AI-Powered Development',
    description: 'Where artificial intelligence meets human creativity. Building the future with neural-powered software solutions.',
    images: ['/og-image.jpg'],
    creator: '@neuralnexus',
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
        <meta name="theme-color" content="#00F0FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
