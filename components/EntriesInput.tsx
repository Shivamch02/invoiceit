import { FaTrash } from "react-icons/fa";

interface EntriesInputProps {
  //tsc-ignore
  onClick: () => void; // Function to handle click events
}
//tsc-ignore
export const EntriesInput: React.FC<EntriesInputProps> = ({ onClick }) => {
  return (
    <div>
      <div className="flex justify-between p-2 gap-2 hover:bg-gray-700 rounded-xl">
        <input
          type="text"
          placeholder="Enter text"
          className="w-[40%] p-2 border border-gray-600 rounded-xl bg-black text-white"
        />
        <input
          type="text"
          placeholder="Enter more text"
          className="w-[25%] p-2 border border-gray-600 rounded-xl bg-black text-white"
        />
        <input
          type="number"
          placeholder="Enter number"
          className="w-[30%] p-2 border border-gray-600 rounded-xl bg-black text-white"
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
