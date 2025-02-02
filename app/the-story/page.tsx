import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'
import TimelineStory from '@components/timelineStory'

export default function TheStory() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <TimelineStory />
      </Content>
      <Footer />
    </main>
  )
}
