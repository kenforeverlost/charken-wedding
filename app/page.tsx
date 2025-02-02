import Image from 'next/image'
import { Allura, Unna } from 'next/font/google'
import { HiChevronRight } from 'react-icons/hi'
import AccessForm from '@components/accessForm'
import Content from '@components/main/content'

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

export default function Home() {
  let headerImage =
    'https://exiknbsnihiuomwzvubu.supabase.co/storage/v1/object/public/images/wedding/engagement-shoot/engagement-117.jpg'

  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <div className="flex flex-col max-w-4xl mt-12 mb-10">
        <div className="flex flex-col items-center text-center">
          <div
            className={`${mainText.className} tracking-widest text-2xl sm:text-4xl md:text-5xl`}
          >
            CHARMAIGNE <span className={`${cursiveText.className}`}>&</span>{' '}
            KENDRICK
          </div>
        </div>
      </div>
      <Content>
        <img src={headerImage} />
        <AccessForm />
      </Content>
    </main>
  )
}
