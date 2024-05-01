import React from 'react'
import AuthButton from '@/components/AuthButton'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

function Navbar() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()
  return (
    <nav className="flex h-16 w-full items-center justify-center space-x-4 border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        {/* {isSupabaseConnected && <AuthButton />} */}
      </div>
      <Link href="/">Gallery</Link>
      {/* <Link href="/maker">Maker</Link> */}
      <ThemeToggle />
    </nav>
  )
}

export default Navbar