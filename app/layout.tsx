import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'Piddle - Stop Piddling Around',
  description: 'Build streaks, stay accountable, and crush your goals with friends. The gamified habit tracker that makes consistency fun.',
}

export const viewport: Viewport = {
  themeColor: '#A02122',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[var(--color-bg)]">
      <body className="font-body bg-[var(--color-bg)] text-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}
