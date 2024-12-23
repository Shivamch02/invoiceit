export const CurrencyBtn = ({
  icon,
  bgColor,
}: {
  icon?: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <div>
      <button
        className={`px-4 py-2 rounded-lg border border-gray-600 ${bgColor}`}
      >
        {icon}
      </button>
    </div>
  );
};
