import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neural Nexus - AI-Powered Development',
  description: 'Where artificial intelligence meets human creativity. Building the future with neural-powered software solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
