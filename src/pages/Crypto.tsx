import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
  sparkline_in_7d: { price: number[] };
};

export default function Crypto() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"price" | "mcap">("price");

  const [params, setParams] = useSearchParams();
  const symbol = params.get("symbol") || "BTC";

  // 🔥 FIX SYMBOL (NO RANDOM ERROR)
  const chartSymbol =
    mode === "price"
      ? `BINANCE:${symbol}USDT`
      : `CRYPTOCAP:${symbol}`;

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const f = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, coins]);

  async function fetchCoins() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true"
    );
    const data = await res.json();
    setCoins(data);
    setFiltered(data);
  }

  function formatPrice(p: number) {
    return `$${p.toLocaleString()}`;
  }

  function getSignal(change: number) {
    if (change > 3) return { text: "SELL", color: "text-red-400" };
    if (change < -3) return { text: "BUY", color: "text-green-400" };
    return { text: "HOLD", color: "text-yellow-400" };
  }

  function Sparkline({ data }: { data: number[] }) {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const points = data
      .map((d, i) => {
        const x = (i / data.length) * 100;
        const y = 100 - ((d - min) / (max - min)) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg className="w-full h-10">
        <polyline
          fill="none"
          stroke="lime"
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">
          Crypto Price Outlook
        </h1>

        <input
          placeholder="Search BTC, ETH..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border border-gray-700 px-3 py-2 rounded-lg text-white text-sm"
        />
      </div>

      {/* TOGGLE */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("price")}
          className={`px-3 py-1 rounded ${
            mode === "price"
              ? "bg-green-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          Price
        </button>

        <button
          onClick={() => setMode("mcap")}
          className={`px-3 py-1 rounded ${
            mode === "mcap"
              ? "bg-green-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          Mcap
        </button>
      </div>

      {/* CHART */}
      <div className="card-dark p-4 rounded-2xl">
        <TradingViewChart
          key={`${symbol}-${mode}-${Date.now()}`}
          symbol={chartSymbol}
        />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">

        {filtered.map((c) => {
          const sym = c.symbol.toUpperCase();
          const change = c.price_change_percentage_24h || 0;
          const signal = getSignal(change);

          return (
            <div
              key={c.id}
              onClick={() => {
                setParams({ symbol: sym });
                setMode("price"); // 🔥 reset ke price
              }}
              className="card-dark p-4 rounded-xl cursor-pointer 
              border border-gray-800 hover:border-green-400
              hover:scale-105 transition-all duration-300"
            >

              {/* TOP */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={c.image} className="w-8 h-8" />
                  <div>
                    <p className="text-white font-semibold">
                      {sym}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {c.name}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400">
                  #{c.market_cap_rank}
                </span>
              </div>

              {/* PRICE */}
              <p className="text-lg font-bold text-white mt-2">
                {formatPrice(c.current_price)}
              </p>

              {/* CHANGE */}
              <p
                className={`text-sm font-semibold ${
                  change > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {change.toFixed(2)}%
              </p>

              {/* SPARKLINE */}
              <Sparkline data={c.sparkline_in_7d.price} />

              {/* SIGNAL */}
              <p className={`text-sm mt-2 font-bold ${signal.color}`}>
                AI Signal: {signal.text}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}