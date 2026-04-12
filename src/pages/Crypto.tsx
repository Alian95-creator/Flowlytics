import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";

export default function Crypto() {
  const [coins, setCoins] = useState<any[]>([]);
  const [params, setParams] = useSearchParams();

  const view = params.get("view") || "default";
  const symbol = params.get("symbol") || "BTC";

  useEffect(() => {
    fetchCoins();
  }, []);

  async function fetchCoins() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    );
    const data = await res.json();
    setCoins(data);
  }

  return (
    <div className="space-y-6">

      {/* 🔥 VIEW SWITCH */}
      {view === "trends" && (
        <div className="card-dark p-4 rounded-xl">
          <h2 className="text-green-400 mb-3">🔥 Market Trends</h2>
          <p className="text-gray-400 text-sm">
            Top gaining & losing crypto (mock AI insight)
          </p>
        </div>
      )}

      {view === "volume" && (
        <div className="card-dark p-4 rounded-xl">
          <h2 className="text-green-400 mb-3">📊 Volume Analysis</h2>
          <p className="text-gray-400 text-sm">
            High trading volume assets
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
      <div className="card-dark rounded-2xl">
        {coins.map((c) => {
          const sym = c.symbol?.toUpperCase() || "UNK";

          return (
            <div
              key={c.id}
              onClick={() => setParams({ symbol: sym })}
              className="p-4 border-b border-gray-800 cursor-pointer hover:bg-white/5"
            >
              {c.name} ({sym})
            </div>
          );
        })}
      </div>

    </div>
  );
}