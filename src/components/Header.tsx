import { createServerClient } from '@/utils/supabase'
import NextLogo from './NextLogo'
import SupabaseLogo from './SupabaseLogo'
import { cookies } from 'next/headers'

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-16 text-3xl font-semibold">
      Michi is infinite
    </div>
  )
}
