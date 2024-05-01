import { createServerClientWithAdmin } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, tags, file } = req.body
    const cookieStore = cookies()
    const supabaseAdmin = createServerClientWithAdmin(cookieStore)

    // Process file upload
    const fileExt = file.name.split('.').pop()
    const fileName = `ye`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      console.log('Error uploading file:', uploadError)

      throw new Error('Failed to upload image')
    }

    // Insert metadata into the database
    const { error } = await supabaseAdmin
      .from('images')
      .insert([{ title, tags, url: filePath }])

    if (error) {
      console.log('Error inserting image data:', error)

      throw new Error('Failed to insert image data')
    }

    return NextResponse.json({ message: 'Image uploaded successfully' })
  } catch (error) {
    console.log('Error uploading file:', error)

    return NextResponse.json({ message: 'Error uploading file' })
  }
}
