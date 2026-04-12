import { useEffect, useState } from "react";
import axios from "axios";
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
    symbol: "XAU/USD",
    tvSymbol: "OANDA:XAUUSD",
    image: "/commodities/xau.png",
  },
  {
    name: "Oil",
    symbol: "WTI",
    tvSymbol: "TVC:USOIL",
    image: "/commodities/oil.png",
  },
  {
    name: "Silver",
    symbol: "XAG/USD",
    tvSymbol: "OANDA:XAGUSD",
    image: "/commodities/xag.png",
  },
];

export default function Commodity() {
  const [selected, setSelected] = useState(commodities[0]);
  const [prices, setPrices] = useState<any>({});

  // 🔥 FETCH REAL PRICE
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get("/api/commodities");
        setPrices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  // helper
  const getPrice = (symbol: string) => {
    if (symbol.includes("XAU")) return prices.gold;
    if (symbol.includes("XAG")) return prices.silver;
    if (symbol.includes("WTI")) return prices.oil;
    return null;
  };

  return (
    <div className="p-6 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Commodity Terminal</h1>
        <span className="text-sm text-gray-400">Live Market</span>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        {commodities.map((item) => {
          const price = getPrice(item.symbol);

          return (
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
                  className="w-6 h-6"
                />
                <h2 className="font-semibold">{item.symbol}</h2>
              </div>

              <p className="text-lg font-bold">
                {price ? `$${price}` : "Loading..."}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHART */}
      <div className="bg-gray-100 dark:bg-gray-900 border p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-4">
          {selected.name} ({selected.symbol})
        </h2>

        <TradingViewChart symbol={selected.tvSymbol} />
      </div>
    </div>
  );
}