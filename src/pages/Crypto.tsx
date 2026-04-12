import { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { name: "BTC", price: 67000, change: 2.3 },
  { name: "ETH", price: 3200, change: -1.2 },
  { name: "SOL", price: 150, change: 5.4 },
  { name: "BNB", price: 580, change: 0.8 },
];

const chartData = [
  { value: 10 },
  { value: 20 },
  { value: 15 },
  { value: 30 },
  { value: 25 },
];

export default function Market() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "gainers"
      ? dummyData.filter((c) => c.change > 0)
      : filter === "losers"
      ? dummyData.filter((c) => c.change < 0)
      : dummyData;

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Market Overview</h1>

        <div className="flex gap-2">
          {["all", "gainers", "losers"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm capitalize ${
                filter === f
                  ? "bg-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* INSIGHT */}
      <div className="bg-gray-900 p-4 rounded-xl mb-6 border border-gray-800">
        <p className="text-sm text-gray-400">Market Insight</p>
        <h2 className="text-lg font-semibold">
          🚀 Bitcoin dominance rising this week
        </h2>
      </div>

      {/* CRYPTO GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.map((coin) => (
          <div
            key={coin.name}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{coin.name}</h3>
              <span
                className={`text-sm ${
                  coin.change > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {coin.change}%
              </span>
            </div>

            <p className="text-xl font-bold mb-2">
              ${coin.price.toLocaleString()}
            </p>

            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={coin.change > 0 ? "#4ade80" : "#f87171"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* COMMODITY */}
      <h2 className="text-xl font-bold mb-4">Commodities</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: "Gold", price: 2300, change: 1.2, note: "Safe haven demand" },
          { name: "Oil", price: 82, change: -0.8, note: "Supply pressure" },
        ].map((item) => (
          <div
            key={item.name}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-yellow-500 transition"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{item.name}</h3>
              <span
                className={`text-sm ${
                  item.change > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.change}%
              </span>
            </div>

            <p className="text-xl font-bold">
              ${item.price.toLocaleString()}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}