import { useEffect, useState } from "react";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

type Pair = {
  pair: string;
  price: number;
  change: number;
  country: string;
  tvSymbol: string;
  candles: Candle[];
};

const bases = [
  { code: "USD", country: "us" },
  { code: "EUR", country: "eu" },
  { code: "GBP", country: "gb" },
  { code: "AUD", country: "au" },
  { code: "JPY", country: "jp" },
  { code: "CNY", country: "cn" },
  { code: "SGD", country: "sg" },
  { code: "MYR", country: "my" },
  { code: "THB", country: "th" },
  { code: "KRW", country: "kr" },
  { code: "TWD", country: "tw" },
  { code: "HKD", country: "hk" },
  { code: "SAR", country: "sa" },
];

export default function Forex() {
  const [data, setData] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // ⚡ faster refresh
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const results = await Promise.all(
        bases.map(async (b) => {
          const res = await fetch(
            `https://open.er-api.com/v6/latest/${b.code}`
          );
          const json = await res.json();

          const price = json?.rates?.["IDR"] || 0;

          return {
            pair: `${b.code}/IDR`,
            price,
            change: Math.random() * 2 - 1,
            country: b.country,
            tvSymbol: `FX_IDC:${b.code}IDR`,
            candles: generateCandles(price),
          };
        })
      );

      setData(results);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function generateCandles(base: number): Candle[] {
    let candles: Candle[] = [];
    let last = base;

    for (let i = 0; i < 12; i++) {
      const open = last;
      const close = open + (Math.random() - 0.5) * (base * 0.003);
      const high = Math.max(open, close) + Math.random() * (base * 0.002);
      const low = Math.min(open, close) - Math.random() * (base * 0.002);

      candles.push({ open, close, high, low });
      last = close;
    }

    return candles;
  }

  function openChart(symbol: string) {
    window.open(
      `https://www.tradingview.com/chart/?symbol=${symbol}`,
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
              {/* wick */}
              <line
                x1={x}
                x2={x}
                y1={highY}
                y2={lowY}
                stroke={isUp ? "#22c55e" : "#ef4444"}
                strokeWidth="1"
              />

              {/* body */}
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
        Forex Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {data.map((item) => (
            <div
              key={item.pair}
              onClick={() => openChart(item.tvSymbol)}
              className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 bg-black border-gray-800"
            >
              {/* HEADER */}
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w40/${item.country}.png`}
                  className="w-6 h-4 rounded-sm"
                />
                <p className="text-gray-300 text-sm">
                  {item.pair}
                </p>
              </div>

              {/* PRICE */}
              <p className="text-xl font-bold text-white mt-2">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              {/* CHANGE */}
              <p
                className={`text-sm ${
                  item.change > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.change.toFixed(2)}%
              </p>

              {/* 🔥 MINI CANDLE */}
              {renderCandles(item.candles)}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}