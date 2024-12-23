import { FaRupeeSign } from "react-icons/fa";
export const Card = ({ icon }: { icon?: React.ReactNode }) => {
  return (
    <div className="rounded-xl bg-blue-600 p-4 w-full">
      <div className="flex items-center justify-between gap-2 h-24">
        <div className="flex items-center gap-2 flex-col w-[50%] h-full">
          <div className="bg-blue-400 w-full rounded-xl h-full"></div>
          <div className="bg-blue-400 w-full rounded-xl h-full"></div>
        </div>
        <div className="bg-blue-400 w-[50%] h-full rounded-xl"></div>
      </div>
      <div className="bg-blue-400 w-full rounded-xl h-10 mt-2"></div>
      <div className="bg-blue-400 w-full h-10 rounded-xl py-2 mt-2"></div>
      <div className="bg-blue-400 w-full h-10 rounded-xl py-2 mt-2"></div>
      <div className="bg-blue-400 w-full rounded-xl h-24 mt-2 flex items-end">
        <div className="bottom-0 py-2 px-1">
          {icon ? icon : <FaRupeeSign className="text-white" />}
        </div>
      </div>
    </div>
  );
};
