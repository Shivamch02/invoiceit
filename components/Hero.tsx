import { FaArrowRight } from "react-icons/fa";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center py-32">
      <div className="bg-gray-950 rounded-full px-3 py-1 text-sm">
        Trusted by 💙 10000+ freelancers
      </div>
      <div className="text-6xl text-white font-semibold px-60 text-center mt-2">
        Create Invoices in <span className="text-blue-600">minutes</span> not In
        hours
      </div>
      <div className="text-gray-300 text-lg text-center mt-4 px-80">
        A Simple Invoice Generator for Freelancers and Businesses and
        enterprises. Effortlessly create, manage, and send professional
        invoices.
      </div>
      <div className="flex justify-center mt-10 gap-4">
        <button className="text-white bg-blue-500 rounded-lg px-5 py-1.5 flex items-center justify-center gap-4 group transition-all duration-300">
          <span className="transition-transform duration-300 group-hover:translate-x-2 text-lg font-semibold">
            Get Started
          </span>
          <FaArrowRight className="text-sm opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>

        <button className="text-white hover:text-blue-500 hover:underline">
          Try for free
        </button>
      </div>
    </div>
  );
};
