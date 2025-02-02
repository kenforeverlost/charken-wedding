import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'
import FaqSection from '@components/faqSection'

export default function QAndA() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <FaqSection />
      </Content>
      <Footer />
    </main>
  )
}
