import AuthButton from '@/components/AuthButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import AddMichiForm from '@/components/AddMichiForm'
import MichiGallery from '@/components/MichiGallery'
import Link from 'next/link'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: michiList } = await supabase.from('images').select('*')

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="mt-6 flex w-5/6 flex-1 flex-col gap-20 px-3">
        <main className="flex flex-1 flex-col gap-6">
          <MichiGallery michis={michiList || []} />
        </main>
      </div>
    </div>
  )
}
