"use client";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-3 border border-gray-600 rounded-xl">
      <div className="font-bold text-3xl px-2">
        <Link href={"/"}>Invoiceit.</Link>
      </div>
      <div className="gap-2 flex items-center">
        <button className="px-4 py-2.5 rounded-lg border border-gray-600">
          <FaDollarSign className="text-white" />
        </button>
        <button className="px-4 py-2.5 rounded-lg border border-gray-600">
          <MdOutlineDarkMode className="text-white" />
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-blue-500 font-semibold">
          <Link href={"/generate"}> Generate Invoice</Link>
        </button>
      </div>
    </div>
  );
};
