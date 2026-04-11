import { useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

const coins = [
  { name: "Bitcoin", symbol: "BINANCE:BTCUSDT" },
  { name: "Ethereum", symbol: "BINANCE:ETHUSDT" },
  { name: "Solana", symbol: "BINANCE:SOLUSDT" },
  { name: "Polygon", symbol: "BINANCE:MATICUSDT" },
];

export default function Crypto() {
  const [selected, setSelected] = useState(coins[0]);

  return (
    <div className="space-y-6">

      <TradingViewChart symbol={selected.symbol} />

      <div className="bg-white dark:bg-gray-900 rounded shadow">
        {coins.map((c) => (
          <div
            key={c.symbol}
            onClick={() => setSelected(c)}
            className="p-3 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            {c.name}
          </div>
        ))}
      </div>

    </div>
  );
}