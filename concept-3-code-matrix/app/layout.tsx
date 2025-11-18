import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Code Matrix - Beyond the Digital Reality | Software Development Reimagined',
  description: 'Step behind the code. Where reality dissolves into streams of data. Matrix-inspired software development, digital transformation, and reality programming.',
  keywords: ['code matrix', 'digital reality', 'software development', 'programming', 'digital transformation', 'matrix coding', 'reality programming', 'cyberpunk development'],
  authors: [{ name: 'Code Matrix Team' }],
  creator: 'Code Matrix',
  publisher: 'Code Matrix',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codematrix.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Code Matrix - Beyond the Digital Reality',
    description: 'Step behind the code. Where reality dissolves into streams of data.',
    url: 'https://codematrix.dev',
    siteName: 'Code Matrix',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Code Matrix - Beyond the Digital Reality',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Matrix - Beyond the Digital Reality',
    description: 'Step behind the code. Where reality dissolves into streams of data.',
    images: ['/og-image.jpg'],
    creator: '@codematrix',
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
        <meta name="theme-color" content="#00FF41" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="crt-effect">{children}</body>
    </html>
  )
}
