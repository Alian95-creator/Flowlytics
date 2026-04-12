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
    image: "https://cryptologos.cc/logos/gold-xau-logo.png",
    price: "$2,300",
    change: "+1.2%",
  },
  {
    name: "Oil",
    symbol: "WTI",
    tvSymbol: "TVC:USOIL",
    image: "https://cryptologos.cc/logos/oil-logo.png",
    price: "$82",
    change: "-0.8%",
  },
  {
    name: "Silver",
    symbol: "XAG/USD",
    tvSymbol: "OANDA:XAGUSD",
    image: "https://cryptologos.cc/logos/silver-xag-logo.png",
    price: "$27",
    change: "+0.5%",
  },
];

export default function Commodity() {
  const [selected, setSelected] = useState(commodities[0]);

  return (
    <div className="p-6 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">Commodity Dashboard</h1>

      {/* TOP INFO */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        {commodities.map((item) => (
          <div
            key={item.symbol}
            onClick={() => setSelected(item)}
            className={`p-4 rounded-xl cursor-pointer transition border
              ${
                selected.symbol === item.symbol
                  ? "border-blue-500 scale-105"
                  : "border-gray-300 dark:border-gray-700"
              }
              bg-gray-100 dark:bg-gray-900`}
          >
            <div className="flex items-center gap-2 mb-2">
              <img src={item.image} className="w-6 h-6" />
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

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 p-4 rounded-xl">

          <h2 className="text-lg font-bold mb-4">
            {selected.name} Chart
          </h2>

          <TradingViewChart symbol={selected.tvSymbol} />
        </div>

        {/* SIDE INFO */}
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl">

          <h2 className="font-bold mb-4">Market Insight</h2>

          <p className="text-sm text-gray-500">
            {selected.name} is showing strong momentum based on recent
            price action and macroeconomic signals.
          </p>

          <div className="mt-4 space-y-2">
            <p>📊 Trend: Bullish</p>
            <p>🔥 Volatility: Medium</p>
            <p>💡 Signal: Buy on dips</p>
          </div>
        </div>
      </div>
    </div>
  );
}