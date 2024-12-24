import { FaTrash } from "react-icons/fa";
export const TaxEntriesInput = ({ onClick }: any) => {
  return (
    <div>
      <div className="flex justify-between p-2 gap-2 hover:bg-gray-700 rounded-xl">
        <input
          type="text"
          className="w-[45%] p-2 border border-gray-600 rounded-xl bg-black"
        />
        <input
          type="number"
          className="w-[45%] p-2 border border-gray-600 rounded-xl bg-black"
          placeholder="%"
        />
        <div className="w-[5%] flex justify-center cursor-pointer items-center">
          <FaTrash onClick={onClick} />
        </div>
      </div>
      <hr className="border border-gray-700 my-1" />
    </div>
  );
};
