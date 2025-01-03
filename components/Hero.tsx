import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center sm:py-32 py-10">
      <div className="dark:bg-gray-950 bg-gray-200 rounded-full px-3 py-1 text-sm">
        Trusted by 💙 10000+ freelancers
      </div>
      <div className="sm:text-6xl text-4xl dark:text-white text-black font-semibold xl:px-60 lg:px-32 text-center mt-2">
        Create Invoices in <span className="text-blue-600">minutes</span> not In
        hours
      </div>
      <div className="dark:text-gray-300 text-gray-700 sm:text-lg text-md text-center mt-4 xl:px-80 lg:px-48">
        A Simple Invoice Generator for Freelancers and Businesses and
        enterprises. Effortlessly create, manage, and send professional
        invoices.
      </div>
      <div className="flex justify-center mt-10 gap-4">
        <button className="text-white bg-blue-500 rounded-lg sm:px-5 px-3 py-1.5 flex items-center justify-center gap-4 group transition-all duration-300">
          <span className="transition-transform duration-300 group-hover:translate-x-2 sm:text-lg text-md font-semibold">
            <Link href={"/generate"}>Get Started</Link>
          </span>
          <FaArrowRight className="text-sm opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>

        <button className="dark:text-white text-black hover:text-blue-500 hover:underline">
          <Link href={"/generate"}>Try for free</Link>
        </button>
      </div>
    </div>
  );
};
