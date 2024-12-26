import { Card } from "./Card";
import { FaEuroSign, FaRupeeSign } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { CurrencyBtn } from "./CurrencyBtn";

export const Cards = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-12 group">
        <div className="xl:w-1/6 lg:w-1/4 md:w-1/3 w-1/8 sm:block rotate-[-10deg] transition-transform duration-300 group-hover:rotate-[-20deg] opacity-40">
          <Card icon={<FaDollarSign className="text-white text-xl" />} />
        </div>

        <div className="xl:w-1/6 lg:w-1/4 md:w-1/3 w-1/8 w-[65%] z-30 absolute transition-transform duration-300 group-hover:translate-y-[-10px]">
          <Card icon={<FaRupeeSign className="text-white text-xl" />} />
        </div>

        <div className="xl:w-1/6 lg:w-1/4 md:w-1/3 w-1/3 hidden sm:block rotate-[10deg] transition-transform duration-300 group-hover:rotate-[20deg] opacity-40">
          <Card icon={<FaRupeeSign className="text-white text-xl" />} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 py-16">
        <div className="text-center font-semibold text-lg">
          Multi-Currency Support
        </div>
        <div className="flex justify-center gap-4">
          <CurrencyBtn
            icon={<FaRupeeSign className="text-blue-500/80" />}
            bgColor="bg-blue-700/20"
          />
          <CurrencyBtn
            icon={<FaDollarSign className="text-blue-500/80" />}
            bgColor="bg-blue-700/20"
          />
          <CurrencyBtn
            icon={<FaEuroSign className="text-blue-500/80" />}
            bgColor="bg-blue-700/20"
          />
        </div>
      </div>
    </div>
  );
};
