import { AvatarImage, Avatar } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function HeaderMain() {
  return (
    <div className="my-10 flex h-full w-full items-center justify-center  bg-[#f5e1bc]  md:p-2 lg:p-4">
      <div className="flex flex-col items-center  space-y-14">
        <h1 className="text-6xl font-bold text-[#764824]">$michi</h1>
        <div className="mt-8">
          <Image
            alt="Cat"
            className="rounded-xl border-4 border-[#764824]"
            height="300"
            src="/cat.jpg"
            style={{
              aspectRatio: '200/200',
              objectFit: 'cover',
            }}
            width="300"
          />
        </div>
        <div className="mt-4 rounded-xl bg-[#fdf5e7] p-5 text-center  text-xl font-bold text-[#764824]">
          The most memeable cat on the internet
        </div>
        <div className="mt-4 hidden max-w-fit  text-right text-xl font-bold text-[#764824] md:block">
          CA: 5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp
        </div>
        <div className="mt-4 space-x-1  text-xl font-bold text-[#764824]  md:space-x-10">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://jup.ag/swap/SOL-5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp"
          >
            <Button className="rounded-xl bg-[#764824]">BUY HERE</Button>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://michisolana.org/michi-meme-maker/"
          >
            <Button className="rounded-xl bg-[#764824] ">MICHI MAKER</Button>
          </Link>
          <Link href="/gallery">
            <Button className="rounded-xl bg-[#764824] ">GALLERY</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-16 pt-16">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/michionsolana"
          >
            <Avatar className="">
              <AvatarImage alt="michi twitter" src="/twitter.avif" />
            </Avatar>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://dexscreener.com/solana/gh8ers4yzkr3ukdvgvu8cqjfgzu4cu62mteg9bcj7ug6"
          >
            <Avatar className="">
              <AvatarImage alt="Profile picture" src="/dex.webp" />
            </Avatar>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/michiportal"
          >
            <Avatar className="">
              <AvatarImage alt="Profile picture" src="/telegram.png" />
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  )
}
