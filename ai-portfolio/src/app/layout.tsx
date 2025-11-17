import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/layout/CustomCursor'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  keywords: ['AI Engineer', 'Machine Learning', 'Deep Learning', 'Full Stack Developer', 'Portfolio'],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-cyber-cyan focus:px-4 focus:py-2 focus:text-cyber-dark focus:outline-none focus:ring-2 focus:ring-cyber-cyan"
        >
          Skip to content
        </a>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
