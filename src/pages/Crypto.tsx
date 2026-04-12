import { useEffect, useState } from "react";
import axios from "axios";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  candles: Candle[];
};

export default function Crypto() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000); // 🔥 10 detik (aman, gak spam API)
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
          },
        }
      );

      const coins = res.data.map((coin: any) => ({
        ...coin,
        candles: generateCandles(coin.current_price),
      }));

      setData(coins);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  function generateCandles(base: number): Candle[] {
    let candles: Candle[] = [];
    let last = base;

    for (let i = 0; i < 12; i++) {
      const open = last;
      const close = open + (Math.random() - 0.5) * (base * 0.002);
      const high = Math.max(open, close) + Math.random() * (base * 0.001);
      const low = Math.min(open, close) - Math.random() * (base * 0.001);

      candles.push({ open, close, high, low });
      last = close;
    }

    return candles;
  }

  function openChart(symbol: string) {
    const clean = symbol.toUpperCase() + "USDT";

    window.open(
      `https://www.tradingview.com/chart/?symbol=BINANCE:${clean}`,
      "_blank"
    );
  }

  function renderCandles(candles: Candle[]) {
    const max = Math.max(...candles.map((c) => c.high));
    const min = Math.min(...candles.map((c) => c.low));

    return (
      <svg viewBox="0 0 100 60" className="w-full h-16 mt-3">
        {candles.map((c, i) => {
          const x = (i / candles.length) * 100;

          const openY = 60 - ((c.open - min) / (max - min)) * 60;
          const closeY = 60 - ((c.close - min) / (max - min)) * 60;
          const highY = 60 - ((c.high - min) / (max - min)) * 60;
          const lowY = 60 - ((c.low - min) / (max - min)) * 60;

          const isUp = c.close > c.open;

          return (
            <g key={i}>
              <line
                x1={x}
                x2={x}
                y1={highY}
                y2={lowY}
                stroke={isUp ? "#22c55e" : "#ef4444"}
                strokeWidth="1"
              />
              <rect
                x={x - 1}
                y={Math.min(openY, closeY)}
                width="2"
                height={Math.abs(openY - closeY) || 1}
                fill={isUp ? "#22c55e" : "#ef4444"}
              />
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-green-400 neon-green">
        Crypto Market (Top 100)
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading market...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {data.map((coin) => (
            <div
              key={coin.id}
              onClick={() => openChart(coin.symbol)}
              className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 bg-black border-gray-800"
            >
              {/* HEADER */}
              <div className="flex items-center gap-2">
                <img
                  src={coin.image}
                  className="w-6 h-6"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/logo.png";
                  }}
                />
                <p className="text-gray-300 text-sm uppercase">
                  {coin.symbol}/USDT
                </p>
              </div>

              {/* PRICE */}
              <p className="text-xl font-bold text-white mt-2">
                ${coin.current_price.toLocaleString()}
              </p>

              {/* CHANGE */}
              <p
                className={`text-sm ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>

              {/* MINI CANDLE */}
              {renderCandles(coin.candles)}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}