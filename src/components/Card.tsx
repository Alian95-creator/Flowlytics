type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function Card({ title, value, change }: Props) {
  const isPositive = change?.startsWith("+");

  return (
    <div className="bg-white dark:card-dark p-5 rounded-2xl transition-all duration-200 hover:scale-[1.03]">

      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2 dark:text-white">
        {value}
      </p>

      {change && (
        <p
          className={`text-sm mt-1 ${
            isPositive ? "neon-green" : "neon-red"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}