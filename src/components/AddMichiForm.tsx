'use client'
import { useState, useCallback, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Loader2, Upload } from 'lucide-react'
import { UploadButton, UploadDropzone } from '@/utils/uploadthing'
import { useUploadThing } from '@/utils/uploadthing'
import { on } from 'events'

const AddMichiForm = () => {
  const supabase = createBrowserClient()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  // Handle file selection for preview
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0])
    setPreviewUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  // Configure the upload logic
  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onBeforeUploadBegin(files) {
      if (title === '' || tags === '') {
        alert('Please fill in the title and tags')
        return []
      }
      return files
    },
    onClientUploadComplete: () => {
      alert('Uploaded successfully!')
      setTags('')
      setTitle('')
      setFile(null)
      setPreviewUrl('')
      setUploading(false)
    },
    onUploadError: () => {
      alert('Error occurred while uploading')
      setUploading(false)
    },
    onUploadBegin: () => {
      setUploading(true)
    },
  })

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  useEffect(() => {
    console.log('previewUrl', previewUrl)
  }, [previewUrl])

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
                alert('Please fill in the title and tags')
                setFile(null)
                setPreviewUrl('')
                return []
              }
              setPreviewUrl(URL.createObjectURL(files[0]))
              onDrop(files)
              return files
            }}
            onClientUploadComplete={async (res) => {
              const { error } = await supabase
                .from('images')
                .insert([{ title, tags, url: res[0].url }])
              if (error) {
                alert('Error inserting image data')
                return
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AddMichiForm
