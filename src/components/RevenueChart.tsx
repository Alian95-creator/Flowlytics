import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-2xl shadow-sm border transition">
      <h3 className="mb-4 font-semibold">Price Chart (30 Days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}