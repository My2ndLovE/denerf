import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Code Matrix - Beyond the Digital Reality',
  description: 'Step behind the code. Where reality dissolves into streams of data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="crt-effect">{children}</body>
    </html>
  )
}
