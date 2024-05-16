import { HeaderMain } from '@/components/component/header-main'
import Tokenomics from '@/components/Tokenomics'
import MoreMemes from '@/components/MoreMemes'

export default function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="mt-6 flex w-11/12 flex-1 flex-col gap-20">
        <main className="flex flex-1 flex-col gap-6 text-[#764824]">
          <HeaderMain />
          <Tokenomics />
          <MoreMemes />
        </main>
      </div>
    </div>
  )
}
