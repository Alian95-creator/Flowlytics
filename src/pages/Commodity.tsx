import { useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

interface Commodity {
  name: string;
  symbol: string;
  tvSymbol: string;
  image: string;
  price: string;
  change: string;
}

const commodities: Commodity[] = [
  {
    name: "Gold",
    symbol: "XAU/USD",
    tvSymbol: "OANDA:XAUUSD",
    image: "/commodities/xau.png",
    price: "$2,300",
    change: "+1.2%",
  },
  {
    name: "Oil",
    symbol: "WTI",
    tvSymbol: "TVC:USOIL",
    image: "/commodities/oil.png",
    price: "$82",
    change: "-0.8%",
  },
  {
    name: "Silver",
    symbol: "XAG/USD",
    tvSymbol: "OANDA:XAGUSD",
    image: "/commodities/xag.png",
    price: "$27",
    change: "+0.5%",
  },
];

export default function Commodity() {
  const [selected, setSelected] = useState(commodities[0]);

  return (
    <div className="p-6 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Commodity Terminal</h1>
        <span className="text-sm text-gray-400">Live Market</span>
      </div>

      {/* MARKET CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        {commodities.map((item) => (
          <div
            key={item.symbol}
            onClick={() => setSelected(item)}
            className={`p-4 rounded-xl cursor-pointer transition border
              ${
                selected.symbol === item.symbol
                  ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/20"
                  : "border-gray-300 dark:border-gray-700 hover:scale-105 hover:shadow-md"
              }
              bg-gray-100 dark:bg-gray-900`}
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={item.image}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo.png";
                }}
                className="w-6 h-6 object-contain"
              />
              <h2 className="font-semibold">{item.symbol}</h2>
            </div>

            <p className="text-lg font-bold">{item.price}</p>

            <p
              className={
                item.change.includes("+")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 shadow-lg p-4 rounded-xl">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {selected.name} ({selected.symbol})
            </h2>
            <span className="text-sm text-gray-400">Realtime</span>
          </div>

          <TradingViewChart symbol={selected.tvSymbol} />
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4">

          {/* MARKET INSIGHT */}
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-300 dark:border-gray-800">
            <h2 className="font-bold mb-3">Market Insight</h2>

            <p className="text-sm text-gray-500">
              {selected.name} is currently showing strong momentum with
              potential continuation based on macroeconomic signals.
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>📊 Trend: Bullish</p>
              <p>🔥 Volatility: Medium</p>
              <p>💡 Signal: Buy on dips</p>
            </div>
          </div>

          {/* MARKET ACTIVITY */}
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-300 dark:border-gray-800">
            <h2 className="font-bold mb-3">Market Activity</h2>

            <div className="space-y-2 text-sm">
              <p>🟢 Gold spikes after news</p>
              <p>🔴 Oil drops due to supply</p>
              <p>🟡 Silver stable range</p>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-300 dark:border-gray-800">
            <h2 className="font-bold mb-3">Quick Stats</h2>

            <div className="text-sm space-y-1">
              <p>Volume: High</p>
              <p>Market Sentiment: Positive</p>
              <p>Last Update: Just now</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}