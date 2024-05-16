import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { ourFileRouter } from './api/uploadthing/core'
import { extractRouterConfig } from 'uploadthing/server'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Michi',
  description: 'Best meme coin on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <body className=" bg-[#f5e1bc]  text-foreground">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            {children}
            <Toaster />
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
