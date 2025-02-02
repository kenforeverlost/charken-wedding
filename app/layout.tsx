import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'

import './globals.css'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Forever Charred',
  description: 'The Wedding of Charmaigne & Kendrick',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>{children}</body>
    </html>
  )
}
