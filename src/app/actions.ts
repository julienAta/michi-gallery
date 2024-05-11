'use server'
import {
  createServerClient,
  createServerClientWithAdmin,
} from '@/utils/supabase'
import { cookies } from 'next/headers'
import { UTApi } from 'uploadthing/server'

export default async function deleteMichi(
  variables: { id?: string; key?: string } = {},
) {
  const { id, key } = variables
  if (!id || !key) return null
  const utapi = new UTApi()
  const cookieStore = cookies()
  const supabase = createServerClientWithAdmin(cookieStore)

  const user = await supabase.auth.getUser()
  if (!user || !user.data.user?.id) {
    throw new Error('You must be logged in to delete michis')
  }

  const { error } = await supabase.from('images').delete().eq('id', id)
  if (error) {
    throw new Error('Error deleting michi')
  }

  await utapi.deleteFiles(key)
  return true
}

export async function updateMichi(variables: {
  id: string
  title: string
  tags: string
}) {
  const { id, title, tags } = variables
  const cookieStore = cookies()
  const supabase = createServerClientWithAdmin(cookieStore)
  const user = await supabase.auth.getUser()
  if (!user || !user.data.user?.id) {
    throw new Error('You must be logged in to delete michis')
  }

  const { data, error } = await supabase
    .from('images')
    .update({ title, tags })
    .eq('id', id)

  if (error) {
    throw new Error('Error updating michi: ' + error.message)
  }

  return data
}
