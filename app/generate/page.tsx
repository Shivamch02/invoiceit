import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Invoice } from "@/components/Invoice";

const page = () => {
  return (
    <div className=" text-white bg-gray-800 min-h-screen">
      <div className=" w-full h-full px-32 py-6">
        <Header />
        <Invoice />
      </div>
      <hr className="border-gray-700" />
      <div className="px-32">
        <Footer />
      </div>
    </div>
  );
};

export default page;
