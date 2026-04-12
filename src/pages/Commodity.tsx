import { useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

interface Commodity {
  name: string;
  symbol: string;
  tvSymbol: string;
  image: string;
}

const commodities: Commodity[] = [
  {
    name: "Gold",
    symbol: "XAU",
    tvSymbol: "OANDA:XAUUSD",
    image: "https://cryptologos.cc/logos/gold-xau-logo.png",
  },
  {
    name: "Silver",
    symbol: "XAG",
    tvSymbol: "OANDA:XAGUSD",
    image: "https://cryptologos.cc/logos/silver-xag-logo.png",
  },
  {
    name: "Crude Oil",
    symbol: "WTI",
    tvSymbol: "TVC:USOIL",
    image: "https://cryptologos.cc/logos/oil-logo.png",
  },
  {
    name: "Natural Gas",
    symbol: "NG",
    tvSymbol: "TVC:NATGAS",
    image: "https://cryptologos.cc/logos/gas-logo.png",
  },
];

export default function Commodity() {
  const [selected, setSelected] = useState<Commodity>(commodities[0]);
  const [search, setSearch] = useState("");

  const filtered = commodities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-1/3 border-r border-gray-300 dark:border-gray-800 p-4 overflow-y-auto">

        <h1 className="text-xl font-bold mb-4">Commodities</h1>

        <input
          type="text"
          placeholder="Search commodity..."
          className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-800"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-2">

          {filtered.map((item) => (
            <div
              key={item.symbol}
              onClick={() => setSelected(item)}
              className={`flex items-center justify-between p-3 rounded cursor-pointer transition
                ${
                  selected.symbol === item.symbol
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-900 hover:scale-[1.02]"
                }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-2">
                <img src={item.image} className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">
                    {item.symbol}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <span className="text-xs text-gray-400">
                View Chart →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-4">

        <h2 className="text-xl font-bold mb-4">
          {selected.name} Chart
        </h2>

        <TradingViewChart symbol={selected.tvSymbol} />
      </div>
    </div>
  );
}