import { Unna } from "next/font/google";
import Content from "@components/main/content";
import Header from "@components/main/header";
import Footer from "@components/main/footer";
import BucketGallery from "@components/bucketGallery";

const mainText = Unna({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Gallery() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <div
          className={`${mainText.className} text-4xl sm:text-5xl text-center flex flex-row justify-center`}
        >
          <div className="border-b border-secondary w-full max-w-2xl pb-3 mx-5">
            Highlights
          </div>
        </div>
        <div className="flex flex-col gap-16 w-full">
          <div className="flex flex-col gap-6">
            <BucketGallery folder="highlights" />
          </div>
        </div>
        <div className="text-center">
          View more of our favorite photos and candids{" "}
          <a
            href="https://www.dropbox.com/scl/fo/m486box1jgsh4zxo77vxn/AOn-Cd_0b282l3OunzsyfFA?rlkey=nq0pwxrl70dz9ll8mab0am2li&st=0ezecnkr&dl=0"
            target="_blank"
          >
            here
          </a>
          !
        </div>
      </Content>
      <Footer />
    </main>
  );
}
