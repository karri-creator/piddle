import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'


export const metadata: Metadata = {
  title: 'Piddle',
  description: 'Stop Piddling Around! Personal streak tracker for habit builders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body bg-[var(--color-bg)] text-white">
        <Header />
        {children}
      </body>
    </html>
  )
}