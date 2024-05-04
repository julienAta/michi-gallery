import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { ourFileRouter } from './api/uploadthing/core'
import { extractRouterConfig } from 'uploadthing/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Michi Palace',
  description: 'Infinite Michis',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const user = await supabase.auth.getUser()
  const isAuth = user ? true : false

  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background text-foreground">
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
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="flex min-h-screen flex-col items-center">
              {isAuth && <Navbar />}
              {children}
              <Analytics />
              {/* ^^ remove this if you are not deploying to vercel. See more at https://vercel.com/docs/analytics  */}
              {/* <Footer /> */}
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
