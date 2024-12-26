import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className=" text-white bg-gradient-to-tl from-black to-gray-800 min-h-screen">
      <div className=" w-full h-full xl:px-32 lg:px-20 md:px-10 px-4 py-6">
        <Header />
        <Hero />
        <Cards />
      </div>
      <hr className="border-gray-700" />
      <div className="xl:px-32 lg:px-20 md:px-10">
        <Footer />
      </div>
    </div>
  );
}
