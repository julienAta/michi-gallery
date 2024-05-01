'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'

interface MichiGalleryProps {
  title: string
  tags: string
  url: string
  createdAt: string
}
interface MichisGalleryProps {
  michis: MichiGalleryProps[]
}

function MichiGallery({ michis }: MichisGalleryProps) {
  const [search, setSearch] = useState('')
  const filteredMichis = michis.filter(
    (michi) =>
      michi.title.toLowerCase().includes(search.toLowerCase()) ||
      michi.tags.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col items-center">
      <Input
        type="text"
        placeholder="Search by title or tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-1/2 rounded-lg border p-2"
      />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {filteredMichis.map((michi, index) => (
          <a
            key={michi.url + index}
            href={michi.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group relative">
              <Image
                width={200}
                height={200}
                className="h-auto w-full rounded-lg object-cover" // Added object-cover to maintain aspect ratio
                src={michi.url}
                alt={michi.title}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-lg font-bold">{michi.title}</p>
                <p className="text-sm">{michi.tags}</p>
                {/* Uncomment if you also want to show createdAt on hover */}
                {/* <p className="text-xs">{michi.createdAt}</p> */}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default MichiGallery
