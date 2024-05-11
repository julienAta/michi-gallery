import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import React from 'react'
import MichiMod from '@/components/MichiMod'
async function page() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const user = await supabase.auth.getUser()

  if (!user || !user.data.user?.id) {
    return (
      <div className="flex items-center justify-center text-2xl font-bold">
        404
      </div>
    )
  }
  const { data: michiList } = await supabase.from('images').select('*')

  return <MichiMod michis={michiList || []} />
}

export default page
