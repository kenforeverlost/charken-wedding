import GuestForm from '@components/guestForm'
import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <GuestForm />
      </Content>
      <Footer />
    </main>
  )
}
