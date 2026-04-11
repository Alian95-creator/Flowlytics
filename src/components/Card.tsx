type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function Card({ title, value, change }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:scale-[1.02]">
      
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

      {change && (
        <p
          className={`text-sm mt-1 ${
            change.startsWith("+")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}