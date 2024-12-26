import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Invoice } from "@/components/Invoice";

const page = () => {
  return (
    <div className=" text-white bg-black min-h-screen">
      <div className=" w-full h-full xl:px-32 lg:px-20 md:px-10 px-4 py-6">
        <Header />
        <Invoice />
      </div>
      <hr className="border-gray-700" />
      <div className="xl:px-32 lg:px-20 md:px-10 px-4">
        <Footer />
      </div>
    </div>
  );
};

export default page;
