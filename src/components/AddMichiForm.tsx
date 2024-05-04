'use client'
import { useState, useCallback, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { UploadDropzone } from '@/utils/uploadthing'
import { toast } from 'sonner'

const AddMichiForm = () => {
  const supabase = createBrowserClient()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0])
    setPreviewUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  return (
    <Card className="min-w-full">
      <CardContent className="space-y-5 p-5">
        <h2 className="text-xl font-bold">Add Michi</h2>
        <div className="flex flex-col space-y-4">
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
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-32 object-cover"
            />
          )}

          <UploadDropzone
            className="mt-4"
            endpoint="imageUploader"
            onBeforeUploadBegin={(files: any) => {
              if (title === '' || tags === '') {
                toast('Please fill in the title and tags')
                setFile(null)
                setPreviewUrl('')
                return []
              }

              onDrop(files)
              return files
            }}
            onClientUploadComplete={async (res) => {
              const { error } = await supabase
                .from('images')
                .insert([{ title, tags, url: res[0].url, key: res[0].key }])
              if (error) {
                toast('Error inserting image data')
                return
              }
              setTags('')
              setTitle('')
              setFile(null)
              setPreviewUrl('')
              toast('Uploaded successfully!')
            }}
            onUploadError={(error) => {
              toast('Error occurred while uploading')
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AddMichiForm
