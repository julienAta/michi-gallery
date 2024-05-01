'use client'
import { useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Loader2 } from 'lucide-react'
import { UploadButton } from '@/utils/uploadthing'
import { UploadDropzone } from '@/utils/uploadthing'
const AddMichiForm = () => {
  const supabase = createBrowserClient()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState<File | null>(null)

  return (
    <Card className="min-w-full">
      <CardContent className="space-y-5 p-5">
        <h2 className="text-xl font-bold">Add Michi</h2>
        <div className="flex flex-col space-y-4 ">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          <UploadDropzone
            className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
            endpoint="imageUploader"
            onBeforeUploadBegin={(files) => {
              if (title === '' || tags === '') {
                alert('Please fill in the title and tags')
                return []
              }
              // Preprocess files before uploading (e.g. rename them)
              return files.map(
                (f) => new File([f], 'renamed-' + f.name, { type: f.type }),
              )
            }}
            onClientUploadComplete={async (res) => {
              const { error } = await supabase
                .from('images')
                .insert([{ title, tags, url: res[0].url }])
              if (error) {
                alert('Error inserting image data')
                return
              }
              // Do something with the response
              console.log('Files: ', res)
              res.forEach((file) => {
                console.log('File URL:', file.url)
              })
              setTags('')
              setTitle('')
              alert('Upload Completed')
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AddMichiForm
