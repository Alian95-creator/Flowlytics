import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
};

export default function Crypto() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");

  const [params, setParams] = useSearchParams();
  const symbol = params.get("symbol") || "BTC";

  useEffect(() => {
    fetchCoins();
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
    try {
      const res = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
          )
      );

      const data = await res.json();
      setCoins(data);
      setFiltered(data);
    } catch (err) {
      console.error("fetch error", err);
    }
  }

  function formatPrice(p: number) {
    return `$${p.toLocaleString()}`;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-green-400">
        Crypto Market
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search BTC, ETH..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg text-white text-sm"
      />

      {/* CHART */}
      <div className="card-dark p-4 rounded-2xl">
        <TradingViewChart
          key={symbol}
          symbol={`BINANCE:${symbol}USDT`}
        />
      </div>

      {/* LIST */}
      <div className="card-dark rounded-2xl max-h-[500px] overflow-y-auto">

        {filtered.map((c) => {
          const sym = c.symbol.toUpperCase();

          return (
            <div
              key={c.id}
              onClick={() => setParams({ symbol: sym })}
              className="flex items-center justify-between p-4 border-b border-gray-800 cursor-pointer hover:bg-white/5 transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">
                <img src={c.image} className="w-6 h-6" />
                <div>
                  <p className="text-white text-sm font-semibold">
                    {sym}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {c.name}
                  </p>
                </div>
              </div>

              {/* PRICE */}
              <p className="text-white font-bold text-sm">
                {formatPrice(c.current_price)}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}