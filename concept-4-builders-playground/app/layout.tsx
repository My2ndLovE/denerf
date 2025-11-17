import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Builder's Playground - Constructing Digital Dreams",
  description: 'Where software development meets creative construction. Building amazing digital experiences, one block at a time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
