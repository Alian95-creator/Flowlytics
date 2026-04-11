import { useParams } from "react-router-dom";
import { useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

const commodities = [
  { name: "Gold (XAU/USD)", key: "xauusd", symbol: "OANDA:XAUUSD" },
  { name: "Oil (WTI)", key: "oilusd", symbol: "OANDA:WTICOUSD" },
  { name: "Copper", key: "copperusd", symbol: "COMEX:HG1!" },
];

export default function Commodity() {
  const { symbol } = useParams();

  const defaultCommodity =
    commodities.find((c) => c.key === symbol) || commodities[0];

  const [selected, setSelected] = useState(defaultCommodity);

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h1 className="text-xl font-bold dark:text-white">
        Commodity Dashboard
      </h1>

      {/* CHART */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow border transition">
        <TradingViewChart symbol={selected.symbol} />
      </div>

      {/* LIST */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border transition">
        {commodities.map((c) => (
          <div
            key={c.key}
            onClick={() => setSelected(c)}
            className={`p-4 border-b cursor-pointer transition
              ${
                selected.key === c.key
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
          >
            {c.name}
          </div>
        ))}
      </div>

    </div>
  );
}