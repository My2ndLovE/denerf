import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Liquid Interface - Fluid Digital Experiences',
  description: 'Where design flows like water. Organic, adaptive, alive.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
