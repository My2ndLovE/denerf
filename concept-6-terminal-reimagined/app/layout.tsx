import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Terminal Reimagined - Code Meets Reality | Holographic Development',
  description: 'Where command line interfaces transcend into holographic 3D experiences. Terminal-based development meets cutting-edge 3D visualization.',
  keywords: ['terminal interface', 'holographic UI', '3D terminal', 'command line visualization', 'futuristic development', 'terminal reimagined', 'CLI to 3D', 'holographic coding'],
  authors: [{ name: 'Terminal Reimagined Team' }],
  creator: 'Terminal Reimagined',
  publisher: 'Terminal Reimagined',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://terminalreimagined.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Terminal Reimagined - Code Meets Reality',
    description: 'Where command line interfaces transcend into holographic 3D experiences.',
    url: 'https://terminalreimagined.dev',
    siteName: 'Terminal Reimagined',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Terminal Reimagined - Code Meets Reality',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal Reimagined - Code Meets Reality',
    description: 'Where command line interfaces transcend into holographic 3D experiences.',
    images: ['/og-image.jpg'],
    creator: '@terminalreimagined',
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
        <meta name="theme-color" content="#0DBC79" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="hologram">{children}</body>
    </html>
  )
}
