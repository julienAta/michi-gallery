import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

function MoreMemes() {
  return (
    <div className=" p-8">
      <h1 className="mb-8 text-center text-6xl font-bold">michi memes</h1>
      <div className="mb-8 flex justify-center">
        <Image
          alt="Michi meme"
          className="w-full max-w-4xl rounded-lg"
          height="600"
          src="/michisticker.png"
          style={{
            aspectRatio: '800/600',
            objectFit: 'cover',
          }}
          width="800"
        />
      </div>
      <div className="flex justify-center">
        <Link href="/gallery">
          <Button className="rounded-xl bg-[#764824]">
            SEE THE INFINITY OF MICHI
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default MoreMemes
