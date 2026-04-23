import type { Metadata, Viewport } from 'next'
import { Inter, Raleway } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
})

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['900'],
  style: ['normal', 'italic']
})

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
    <html lang="en" className={`${inter.variable} ${raleway.variable} bg-cream`}>
      <body className="font-sans bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
