import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital Forge - Crafting Innovation',
  description: 'Where code meets craftsmanship. We forge digital products with precision and passion.',
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
