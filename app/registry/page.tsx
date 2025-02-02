import { Allura, Unna } from 'next/font/google'
import { BiLogoVenmo } from 'react-icons/bi'
import { FaGift } from 'react-icons/fa'
import { SiPaypal, SiZelle } from 'react-icons/si'

import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'

const cursiveText = Allura({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const mainText = Unna({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const headerImage =
  'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/engagement-shoot/engagement-16.jpg?t=2024-07-20T02%3A34%3A40.558Z'
const zelleLink =
  'https://enroll.zellepay.com/qr-codes?data=ewogICJhY3Rpb24iIDogInBheW1lbnQiLAogICJuYW1lIiA6ICJLRU5EUklDSyIsCiAgInRva2VuIiA6ICJjaGFya2VuZGxwQGdtYWlsLmNvbSIKfQ=='
const paypalLink = 'https://www.paypal.me/charkendlp'
const venmoLink =
  'https://venmo.com/code?user_id=2073735997685760193&created=1721352222.153225'
const withjoyLink = 'https://withjoy.com/charmaigne-and-kendrick/registry'

const iconClassName = 'text-3xl text-primary'

const ItemCard = ({ link, children }: any) => {
  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-row items-center gap-5 border-2 border-primary rounded p-2 w-full max-w-full md:max-w-md text-black"
    >
      {children}
    </a>
  )
}

export default function Registry() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <div className="flex items-center justify-center">
          <img className="w-full max-w-xs" src={headerImage} />
        </div>
        <div className="flex justify-center">
          <div className="max-w-lg text-center">
            In preparation for our new life together, we have all the
            essentials. If you'd wish to give nonetheless, consider{' '}
            <b>contributing to our honeymoon fund</b> and join us in celebrating
            the start of our married life with an unforgettable adventure!
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 flex-wrap">
          <ItemCard link={venmoLink}>
            <BiLogoVenmo className={iconClassName} />
            <div>
              <div className="text-lg font-bold">Venmo</div>
              <div className="text-md">
                Send to <span className="text-secondary">@charkendlp</span> or{' '}
                <span className="text-secondary">click here</span>
              </div>
            </div>
          </ItemCard>
          <ItemCard link={zelleLink}>
            <SiZelle className={iconClassName} />
            <div>
              <div className="text-lg font-bold">Zelle</div>
              <div className="text-md">
                Send to{' '}
                <span className="text-secondary">charkendlp@gmail.com</span> or{' '}
                <span className="text-secondary">click here</span>
              </div>
            </div>
          </ItemCard>
          <ItemCard link={paypalLink}>
            <SiPaypal className={iconClassName} />
            <div>
              <div className="text-lg font-bold">Paypal</div>
              <div className="text-md">
                Send to{' '}
                <span className="text-secondary">charkendlp@gmail.com</span> or{' '}
                <span className="text-secondary">click here</span>
              </div>
            </div>
          </ItemCard>
          <ItemCard link={withjoyLink}>
            <FaGift className={iconClassName} />
            <div>
              <div className="text-lg font-bold">Registry</div>
              <div className="text-md">
                For credit card options, click{' '}
                <span className="text-secondary">here</span>
              </div>
            </div>
          </ItemCard>
        </div>
      </Content>
      <Footer />
    </main>
  )
}
