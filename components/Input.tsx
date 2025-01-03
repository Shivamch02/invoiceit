export const Input = ({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: string;
}) => {
  return (
    <div className="flex sm:flex-row flex-col sm:items-center justify-between xl:w-[40%] lg:w-[50%] md:w-[60%] w-full py-1">
      <div className="text-lg font-medium sm:py-0 py-2">{label}: </div>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 border border-gray-600 rounded-xl dark:bg-black text-right dark:text-white text-black"
      />
    </div>
  );
};
