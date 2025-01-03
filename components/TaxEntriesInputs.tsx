import { FaTrash } from "react-icons/fa";

interface TaxEntriesInputProps {
  //tsc-ignore
  onClick: () => void; // Define the onClick prop type
}
//tsc-ignore
export const TaxEntriesInput: React.FC<TaxEntriesInputProps> = ({
  onClick,
}) => {
  return (
    <div>
      <div className="flex justify-between py-1 gap-2 dark:hover:bg-gray-700 rounded-xl">
        <input
          type="text"
          className="w-[45%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black placeholder-gray-400"
          placeholder="Enter description"
          aria-label="Description"
        />
        <input
          type="number"
          className="w-[45%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black placeholder-gray-400"
          placeholder="%"
          aria-label="Tax percentage"
        />
        <div className="w-[5%] flex justify-center cursor-pointer items-center">
          <FaTrash
            onClick={onClick}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete entry"
          />
        </div>
      </div>
      <hr className="border border-gray-700 my-1" />
    </div>
  );
};
