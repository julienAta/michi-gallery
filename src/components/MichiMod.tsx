'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { Button } from './ui/button'
import deleteMichi, { updateMichi } from '@/app/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBrowserClient } from '@/utils/supabase'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface MichiGalleryProps {
  title: string
  tags: string
  url: string
  id: string
  key: string
  createdAt: string
}
interface MichisGalleryProps {
  michis: MichiGalleryProps[]
}

function MichiMod({ michis }: MichisGalleryProps) {
  const [search, setSearch] = useState('')
  const [newTitles, setNewTitles] = useState(michis.map((michi) => michi.title))
  const [newTags, setNewTags] = useState(michis.map((michi) => michi.tags))
  const supabase = createBrowserClient()
  const queryClient = useQueryClient()

  const { data: michiList, isLoading } = useQuery({
    queryKey: ['michis'],
    queryFn: async () => {
      const { data, error } = await supabase.from('images').select('*')
      if (error) {
        throw new Error(error.message)
      }
      console.log('data', data)

      return data
    },

    staleTime: 0,
    initialData: michis,
  })

  const { mutate: deleteMichiMutation } = useMutation({
    mutationFn: deleteMichi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['michis'] })
      toast('Michi deleted!')
    },
  })
  const { mutate: updateMichiMutation } = useMutation({
    mutationFn: updateMichi,
    onSuccess: () => {
      toast('Michi updated!')
      queryClient.invalidateQueries({ queryKey: ['michis'] })
    },
  })

  const handleUpdate = ({
    id,
    newTitle,
    newTags,
  }: {
    id: string
    newTitle: string
    newTags: string
  }) => {
    if (!newTitle && !newTags) return toast('Please enter new title or tags')
    updateMichiMutation({ id, title: newTitle, tags: newTags })
  }

  const filteredMichis =
    michiList.filter(
      (michi: MichiGalleryProps) =>
        michi.title.toLowerCase().includes(search.toLowerCase()) ||
        michi.tags.toLowerCase().includes(search.toLowerCase()),
    ) || []

  useEffect(() => {
    if (michiList) {
      const filtered = michiList.filter(
        (michi) =>
          michi.title.toLowerCase().includes(search.toLowerCase()) ||
          michi.tags.toLowerCase().includes(search.toLowerCase()),
      )
      setNewTitles(filtered.map((m) => m.title))
      setNewTags(filtered.map((m) => m.tags))
    }
  }, [search, michiList])

  return (
    <div className="flex flex-col items-center">
      <Input
        type="text"
        placeholder="Search by title or tags..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        className="mb-4 w-1/2 rounded-lg border p-2"
      />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {filteredMichis.map((michi, index) => (
          <div key={michi.url + index}>
            <a href={michi.url} target="_blank" rel="noopener noreferrer">
              <div className="group relative">
                <Image
                  width={200}
                  height={200}
                  className="h-auto w-full rounded-lg object-cover"
                  src={michi.url}
                  alt={michi.title}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-lg font-bold">{michi.title}</p>
                  <p className="text-sm">{michi.tags}</p>
                </div>
              </div>
            </a>
            <div className="flex">
              <div className="flex flex-col">
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      deleteMichiMutation({ id: michi.id, key: michi.key })
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handleUpdate({
                      id: michi.id,
                      newTitle: newTitles[index],
                      newTags: newTags[index],
                    })
                  }
                >
                  Update
                </Button>
              </div>
              <div key={michi.id}>
                <Input
                  type="text"
                  value={newTitles[index]}
                  placeholder="New Title"
                  onChange={(e) =>
                    setNewTitles(
                      newTitles.map((title, i) =>
                        i === index ? e.target.value : title,
                      ),
                    )
                  }
                />
                <Input
                  type="text"
                  value={newTags[index]}
                  placeholder="New Tags"
                  onChange={(e) =>
                    setNewTags(
                      newTags.map((tag, i) =>
                        i === index ? e.target.value : tag,
                      ),
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MichiMod
