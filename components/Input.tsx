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
    <div className="flex items-center justify-between w-[40%] py-2">
      <div className="text-lg font-medium">{label}: </div>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 border border-gray-600 rounded-xl bg-black text-right"
      />
    </div>
  );
};
