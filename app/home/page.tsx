import { Allura, Unna } from "next/font/google";
import Content from "@components/main/content";
import Header from "@components/main/header";
import Footer from "@components/main/footer";
import { isRoomBlockActive, isRsvpActive } from "@lib/helpers";

const cursiveText = Allura({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const mainText = Unna({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  const headerImage =
    "https://pgxsgipgapowrxizqqlh.supabase.co/storage/v1/object/public/img/wedding/Charmaigne-Kendrick-Highlights-40.jpg";

  const roomBlockActive = isRoomBlockActive();
  const rsvpActive = isRsvpActive();

  const vendors = [
    {
      name: "Planning & Design",
      ig: "taramarieevents",
    },
    {
      name: "Photography & Videography",
      ig: "susieandwill",
    },
    {
      name: "Florals",
      ig: "blooms_by_sirce",
    },
    {
      name: "Entertainment",
      ig: "djlivinh",
    },
    {
      name: "Hair & Make Up",
      ig: "hairandmakeuplasvegas",
    },
    {
      name: "Bridal Hair",
      ig: "jen.maneartist",
    },
    {
      name: "Drapes",
      ig: "byancaseventdecor",
    },
    {
      name: "Dance Floor & Rentals",
      ig: "rsvppartyrentals",
    },
    {
      name: "Photo Booth",
      ig: "fromear2earbooth",
    },
    {
      name: "Transport",
      ig: "jaylimovegas",
    },
    {
      name: "Tuxedo",
      ig: "suitsupply",
    },
    {
      name: "Dress",
      ig: "thedresserbridal",
    },
    {
      name: "Dress Alterations",
      ig: "sondrafalkcoutureofficial",
    },
  ];

  return (
    <main className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <Content>
        <div className="flex items-center justify-center">
          <img className="w-full max-w-xs" src={headerImage} />
        </div>
        <div className="flex flex-col gap-12 w-full mt-10">
          <div
            className={`${mainText.className} text-4xl sm:text-5xl text-center flex flex-row justify-center`}
          >
            <div className="border-b border-secondary w-full max-w-lg sm:max-w-xl pb-2 sm:pb-5 mx-5">
              We're Married!
            </div>
          </div>
          <div className="flex flex-row content-start sm:justify-center">
            <div className="text-lg text-center max-w-lg leading-8">
              Our wedding was the most wonderful day of our lives! It would not
              have been the same without all the love and support from our
              friends and family. We are deeply thankful for their generosity
              and presence on our special day!
              <br />
              <br />
              Check out the{" "}
              <a href="/gallery" className="underline">
                photos
              </a>{" "}
              from our big day!
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center max-w-xl">
              <b>Special thanks to our wonderful vendors.</b>
              <br />
              We could not have done it without their hard work and dedication.
              <br />
              Their services are highly recommended!
            </div>
            <div className="text-center">
              {vendors.map((vendor) => {
                return (
                  <div>
                    {vendor.name}:{" "}
                    <a
                      href={`https://www.instagram.com/${vendor.ig}/`}
                      target="_blank"
                    >
                      @{vendor.ig}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </main>
  );
}
