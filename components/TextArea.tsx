export const TextArea = ({
  placeholder,
  label,
}: {
  placeholder?: string;
  label?: string;
}) => {
  return (
    <div className="flex justify-between py-1">
      {" "}
      <div className="flex flex-col">
        <div className="font-semibold sm:text-3xl text-2xl py-2">{label}</div>
        <div>
          <textarea
            placeholder={placeholder}
            rows={2}
            className="dark:bg-black border border-gray-600 rounded-xl px-2 py-1 text-left md:text-lg text-md dark:text-white text-black"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
