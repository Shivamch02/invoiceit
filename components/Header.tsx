"use client";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-3 border border-gray-600 rounded-xl">
      <div className="font-bold sm:text-3xl text-2xl px-2">
        <Link href={"/"}>Invoiceit.</Link>
      </div>
      <div className="gap-2 flex items-center">
        <button className="px-4 py-2.5 rounded-lg border border-gray-600 sm:block hidden">
          <FaDollarSign className="dark:text-white text-black" />
        </button>
        <button className="px-4 py-2.5 rounded-lg border border-gray-600 sm:block hidden">
          <MdOutlineDarkMode className="dark:text-white text-black" />
        </button>
        <button className="sm:px-4 sm:py-2 px-2 py-1 rounded-lg bg-blue-500 font-semibold sm:text-md text-sm">
          <Link href={"/generate"}> Generate Invoice</Link>
        </button>
      </div>
    </div>
  );
};
