import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Piddle - Small Efforts, Big Streaks',
  description: 'Keep on track, cheer each other on, and get nudged gently when you need it. Build consistency with Piddle.',
}

export const viewport: Viewport = {
  themeColor: '#2583FF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-cream">
      <body className="font-body bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
