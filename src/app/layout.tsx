// src/app/layout.tsx
import { Quicksand } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { Providers } from "./providers";

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400','700'] })

export const metadata: Metadata = {
  title: 'Alma Leads App',
  description: 'Leads Management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
