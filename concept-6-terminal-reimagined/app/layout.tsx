import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Terminal Reimagined - Code Meets Reality',
  description: 'Where command line interfaces transcend into holographic 3D experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="hologram">{children}</body>
    </html>
  )
}
