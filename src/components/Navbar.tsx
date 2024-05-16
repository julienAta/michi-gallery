import React from 'react'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import Link from 'next/link'
import { Avatar, AvatarImage } from './ui/avatar'

async function Navbar() {
  const cookieStore = cookies()

  const supabase = createServerClient(cookieStore)
  const user = await supabase.auth.getUser()

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-b-foreground/10 px-10 text-[#764824]">
      <div className="flex items-center">
        <Link href="/">
          <Avatar className="mb-4 mt-3">
            <AvatarImage alt="Profile picture" src="/logo.jpg" />
          </Avatar>
        </Link>
      </div>
      <div className="flex space-x-4 text-sm font-semibold">
        <Link href="/gallery">Gallery</Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://michisolana.org/michi-meme-maker/"
        >
          Maker
        </Link>
        {user && user.data.user?.id && (
          <>
            <Link href="/upload">Upload</Link>
            <Link href="/mod">Mod</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
