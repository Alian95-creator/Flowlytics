import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";

export default function Crypto() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();

  const view = params.get("view") || "default";
  const symbol = params.get("symbol") || "BTC";

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchCoins() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
      );
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error("crypto error", err);
    }
  }

  function formatPrice(p: number) {
    return `$${p.toLocaleString()}`;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-green-400 neon-green">
        Crypto Dashboard
      </h1>

      {/* VIEW SWITCH */}
      {view === "trends" && (
        <div className="card-dark p-4 rounded-xl">
          <h2 className="text-green-400 mb-2">🔥 Market Trends</h2>
          <p className="text-gray-400 text-sm">
            AI insight: biggest gainers & losers today
          </p>
        </div>
      )}

      {view === "volume" && (
        <div className="card-dark p-4 rounded-xl">
          <h2 className="text-green-400 mb-2">📊 Volume Analysis</h2>
          <p className="text-gray-400 text-sm">
            Highest traded crypto assets
          </p>
        </div>
      )}

      {/* CHART */}
      <div className="card-dark p-4 rounded-2xl">
        <TradingViewChart
          key={symbol}
          symbol={`BINANCE:${symbol}USDT`}
        />
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {loading ? (
          <p className="text-gray-500">Loading market...</p>
        ) : (
          coins.map((c) => {
            const sym = c.symbol?.toUpperCase() || "UNK";
            const change = c.price_change_percentage_24h || 0;

            return (
              <div
                key={c.id}
                onClick={() => setParams({ symbol: sym })}
                className="card-dark p-4 rounded-xl cursor-pointer 
                hover:scale-105 hover:border-green-400 border border-gray-800 
                transition-all duration-300"
              >

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-8 h-8"
                    />

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
                  className={`text-sm mt-1 font-semibold ${
                    change > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {change.toFixed(2)}%
                </p>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}