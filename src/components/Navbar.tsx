import React from 'react'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarImage } from './ui/avatar'

async function Navbar() {
  const cookieStore = cookies()

  const supabase = createServerClient(cookieStore)
  const user = await supabase.auth.getUser()

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
    <nav className="flex h-16 w-full items-center justify-between border-b border-b-foreground/10 px-10 text-[#764824]">
      <div className="flex items-center">
        <Link href="/">
          <Avatar className="mb-4">
            <AvatarImage alt="Profile picture" src="/logo.jpg" />
          </Avatar>
        </Link>
      </div>
      <div className="flex space-x-4 text-sm">
        <Link href="/gallery">Gallery</Link>
        {user && user.data.user?.id && (
          <>
            <Link href="/maker">Maker</Link>
            <Link href="/mod">Mod</Link>
          </>
        )}

        {/* {isSupabaseConnected && <AuthButton />} */}
      </div>
    </nav>
  )
}

export default Navbar
