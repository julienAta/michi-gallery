import AuthButton from '@/components/AuthButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import AddMichiForm from '@/components/AddMichiForm'
import MichiGallery from '@/components/MichiGallery'
import Link from 'next/link'
import { HeaderMain } from '@/components/component/header-main'
import Tokenomics from '@/components/Tokenomics'
import MoreMemes from '@/components/MoreMemes'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: michiList } = await supabase.from('images').select('*')

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="mt-6 flex w-5/6 flex-1 flex-col gap-20">
        <main className="flex flex-1 flex-col gap-6 text-[#764824]">
          <HeaderMain />
          <Tokenomics />
          <MoreMemes />
        </main>
      </div>
    </div>
  )
}
