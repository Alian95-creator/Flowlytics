type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function Card({ title, value, change }: Props) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>

      {change && (
        <p
          className={`text-sm mt-1 ${
            change.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}