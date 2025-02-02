import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'

const weddingPartyItems = [
  {
    name: 'Ashley Marks',
    title: 'Matron of Honor',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/AM.jpg',
  },
  {
    name: 'Maui Robinson',
    title: 'Best Lady',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/MR.jpg',
  },
  {
    name: 'Quinton Locklear',
    title: 'Man of Honor',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/QL.jpg',
  },
  {
    name: 'Marcel Daggs',
    title: 'Best Man',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/MD.jpg',
  },
  {
    name: 'Jazelle Edobor',
    title: 'Bridesmaid',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/JE.jpg',
  },
  {
    name: 'Edwin Cerna',
    title: 'Groomsman',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/EC.jpg',
  },
  {
    name: 'Jozelle Mangibin',
    title: 'Bridesmaid',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/JM.jpg',
  },
  {
    name: 'Jermaine Kelly',
    title: 'Groomsman',
    img: 'https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding-party/JK.jpg',
  },
]

export default function WeddingParty() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <div className="flex flex-col sm:flex-row items-center text-center justify-around flex-wrap">
          {weddingPartyItems.map((wpItem) => {
            return (
              <div className="w-full sm:w-[50%] flex flex-col items-center mb-5">
                <div className="w-full flex justify-center mb-2">
                  <img className="w-full max-w-64" src={wpItem.img} />
                </div>
                <div className="text-lg font-bold">{wpItem.name}</div>
                <div>{wpItem.title}</div>
              </div>
            )
          })}
        </div>
      </Content>
      <Footer />
    </main>
  )
}
