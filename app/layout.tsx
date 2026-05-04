import type { Metadata } from 'next'
import './globals.css'
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
      <body>
        {children}
      </body>
    </html>
  )
}