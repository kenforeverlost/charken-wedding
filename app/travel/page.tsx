import { Allura, Unna } from 'next/font/google'
import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'
import { isRoomBlockActive } from '@lib/helpers'

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

export default function Travel() {
  let roomBlockActive = isRoomBlockActive()
  let roomBlockText = roomBlockActive
    ? 'Please use the link below to make a reservation under our room block, which must be made by August 26th.'
    : 'Please use the link below to make a reservation under our room block.'

  let travelItems = [
    {
      title: 'Red Rock Casino Resort & Spa',
      description: `This is where our reception will be held and where our room block is located. We suggest booking your stay here for maximum convenience. ${roomBlockText}`,
      address: '11011 W Charleston Blvd, Las Vegas, NV 89135',
      googleMap: 'https://maps.app.goo.gl/Rw1KkvCLyWe5N4Ds8',
      phone: '+17027977777',
      phoneDisplay: '+1 (702) 797-7777',
      img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/red-rock-casino.jpg',
      website: roomBlockActive
        ? 'https://book.passkey.com/e/50757537'
        : 'https://book.passkey.com/e/50757537',
    },
    {
      title: 'Best Western Plus',
      description: `A nearby hotel located less than 10 minutes from the reception venue.`,
      address: '8669 W Sahara Ave, Las Vegas, NV 89117',
      googleMap: 'https://maps.app.goo.gl/k65bpWMvYubBmiWX9',
      phone: '+17022563766',
      phoneDisplay: '+1 (702) 256-3766',
      img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/best-western-plus.jpg',
      website:
        'https://www.bestwestern.com/en_US/book/hotel-rooms.29084.html?iata=00171880&ssob=BLBWI0004G&cid=BLBWI0004G:google:gmb:29084',
    },
    {
      title: 'La Quinta Inn & Suites',
      description: `Another nearby hotel that is also less than 10 minutes from the reception.`,
      address: '9570 W Sahara Ave, Las Vegas, NV 89117',
      googleMap: 'https://maps.app.goo.gl/bBaRSuNQgeM5WCRp9',
      phone: '+17022430356',
      phoneDisplay: '+1 (702) 243-0356',
      img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/la-quinta.jpg?t=2024-03-03T21%3A22%3A51.694Z',
      website:
        'https://www.wyndhamhotels.com/laquinta/las-vegas-nevada/la-quinta-las-vegas-redrock-summerlin/overview?CID=LC:6ysy27krtpcrqev:52964&iata=00093796',
    },
    {
      title: 'Harry Reid International Airport',
      description: `Formerly known as McCarran, Harry Reid International Airport is the main airport of Las Vegas. It is located 20 minutes away from the reception venue.`,
      address: '5757 Wayne Newton Blvd, Las Vegas, NV 89119',
      googleMap: 'https://maps.app.goo.gl/yYiJZvQAuMASW2jq6',
      phone: '+17022615211',
      phoneDisplay: '+1 (702) 261-5211',
      img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/airport.jpg',
      website: 'https://www.harryreidairport.com/',
    },
  ]

  let redRockCasino =
    'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/red-rock-casino.jpg'

  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <div className="flex flex-col gap-16 w-full">
          {travelItems.map((travelItem, key) => {
            return (
              <div key={key} className="flex flex-col gap-6">
                <div
                  className={`${mainText.className} text-4xl sm:text-5xl text-center flex flex-row justify-center`}
                >
                  <div className="border-b border-secondary w-full max-w-2xl pb-3 mx-5">
                    {travelItem.title}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      className="mb-5 w-full max-w-lg"
                      src={travelItem.img}
                    />
                    <a href={travelItem.googleMap} target="_blank">
                      {travelItem.address}
                    </a>
                    <a href={`tel:${travelItem.phone}`} target="_blank">
                      {travelItem.phoneDisplay}
                    </a>
                  </div>
                  <div className="text-center">{travelItem.description}</div>
                  <div className="w-full flex flex-row justify-center">
                    <a href={travelItem.website} target="_blank">
                      <button className="btn btn-primary">Website</button>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Content>
      <Footer />
    </main>
  )
}
