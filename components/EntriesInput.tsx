import { FaTrash } from "react-icons/fa";
export const EntriesInput = ({ onClick }: any) => {
  return (
    <div>
      <div className="flex justify-between p-2 gap-2">
        <input
          type="text"
          className="w-[40%] p-2 border border-gray-600 rounded-xl bg-gray-800"
        />
        <input
          type="text"
          className="w-[25%] p-2 border border-gray-600 rounded-xl bg-gray-800"
        />
        <input
          type="number"
          className="w-[30%] p-2 border border-gray-600 rounded-xl bg-gray-800"
        />
        <div className="w-[5%] flex justify-center cursor-pointer items-center">
          <FaTrash onClick={onClick} />
        </div>
      </div>
      <hr className="border border-gray-700 my-1" />
    </div>
  );
};
