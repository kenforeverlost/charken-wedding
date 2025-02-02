import { Allura, Unna } from 'next/font/google'
import Navigation from '@components/main/navigation'
import WeddingCountdown from '@components/weddingCountdown'

const mainText = Unna({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const cursiveText = Allura({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function Header() {
  const timeNow = new Date().getTime()

  return (
    <div className="flex flex-col-reverse sm:flex-col w-full sm:max-w-4xl mt-20 sm:mt-12 mb-10">
      <div className="flex flex-col items-center text-center gap-2 px-5">
        <a href="/home" className="text-black">
          <div
            className={`${mainText.className} tracking-widest text-2xl sm:text-4xl md:text-5xl`}
          >
            CHARMAIGNE <span className={`${cursiveText.className}`}>&</span>{' '}
            KENDRICK
          </div>
          <div
            className={`${mainText.className} tracking-widest text-base sm:text-xl md:text-2xl `}
          >
            LAS VEGAS, NV | 10.10.24
          </div>
        </a>
      </div>
      <div className="fixed top-0 left-0 w-full sm:relative z-50">
        <Navigation />
      </div>
    </div>
  )
}
