import Image from 'next/image'
import React from 'react'

function Tokenomics() {
  return (
    <div className=" py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Tokenomics</h1>
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <Image
            alt="Total Supply"
            className="mx-auto mb-4 rounded-full border-4 border-[#764824]"
            height="128"
            src="/cat.jpg"
            style={{
              aspectRatio: '128/128',
              objectFit: 'cover',
            }}
            width="128"
          />
          <h2 className="text-xl font-semibold">Total Supply</h2>
          <p className="text-lg text-slate-900">559,343,847</p>
        </div>
        <div className="text-center">
          <Image
            alt="LP Burned"
            className="mx-auto mb-4 rounded-full border-4 border-[#764824]"
            height="128"
            src="/cat.jpg"
            style={{
              aspectRatio: '128/128',
              objectFit: 'cover',
            }}
            width="128"
          />
          <h2 className="text-xl font-semibold">LP Burned</h2>
          <p className="text-lg text-slate-900">100%</p>
        </div>
        <div className="text-center">
          <Image
            alt="Tax"
            className="mx-auto mb-4 rounded-full border-4 border-[#764824]"
            height="128"
            src="/cat.jpg"
            style={{
              aspectRatio: '128/128',
              objectFit: 'cover',
            }}
            width="128"
          />
          <h2 className="text-xl font-semibold">Tax</h2>
          <p className="text-lg text-slate-900">0%</p>
        </div>
      </div>
    </div>
  )
}

export default Tokenomics
