import AddMichiForm from '@/components/AddMichiForm'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export default async function Page() {
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
  return (
    <div className="flex w-2/6 flex-col justify-center space-y-5 text-center">
      <div className="p-14">
        <h1>Michi Maker</h1>
      </div>
      <AddMichiForm />
    </div>
  )
}
