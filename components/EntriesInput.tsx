import { FaTrash } from "react-icons/fa";

interface EntriesInputProps {
  //tsc-ignore
  onClick: () => void; // Function to handle click events
}
//tsc-ignore
export const EntriesInput: React.FC<EntriesInputProps> = ({ onClick }) => {
  return (
    <div>
      <div className="flex justify-between py-1 gap-2 dark:hover:bg-gray-700 rounded-xl">
        <input
          type="text"
          placeholder="Enter Description"
          className="w-[40%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
        />
        <input
          type="text"
          placeholder="Enter more text"
          className="w-[25%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
        />
        <input
          type="number"
          placeholder="Enter number"
          className="w-[30%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
        />
        <div className="w-[5%] flex justify-center cursor-pointer items-center">
          <FaTrash
            onClick={onClick}
            className="text-red-500 hover:text-red-700"
          />
        </div>
      </div>
      <hr className="border border-gray-700 my-1" />
    </div>
  );
};
