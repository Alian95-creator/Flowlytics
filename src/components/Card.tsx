type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function Card({ title, value, change }: Props) {
  const isUp = change?.includes("+");

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      {change && (
        <p
          className={`text-sm mt-1 font-medium ${
            isUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}