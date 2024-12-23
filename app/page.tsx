import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className=" bg-black text-white">
      <div className=" w-full h-full px-32 py-6">
        <Header />
        <Hero />
        <Cards />
      </div>
      <hr className="border-gray-700" />
      <div className="px-32">
        <Footer />
      </div>
    </div>
  );
}
