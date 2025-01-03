import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className=" dark:text-white dark:bg-gradient-to-tl dark:from-black dark:to-gray-800 min-h-screen bg-white text-black">
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
