import { useEffect, useState } from "react";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

type Commodity = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  tvSymbol: string;
  image: string;
  candles: Candle[];
};

const baseData = [
  {
    name: "Gold",
    symbol: "XAU/USD",
    price: 4749,
    tvSymbol: "OANDA:XAUUSD",
    image: "/commodities/gold.png",
  },
  {
    name: "Silver",
    symbol: "XAG/USD",
    price: 75,
    tvSymbol: "OANDA:XAGUSD",
    image: "/commodities/silver.png",
  },
  {
    name: "Oil",
    symbol: "WTI",
    price: 95,
    tvSymbol: "TVC:USOIL",
    image: "/commodities/oil.png",
  },
];

export default function Commodity() {
  const [data, setData] = useState<Commodity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateData();
    const interval = setInterval(generateData, 2000); // ⚡ realtime feel
    return () => clearInterval(interval);
  }, []);

  function generateData() {
    const results = baseData.map((item) => {
      const change = Math.random() * 2 - 1;
      const newPrice = item.price + change;

      return {
        ...item,
        price: newPrice,
        change,
        candles: generateCandles(newPrice),
      };
    });

    setData(results);
    setLoading(false);
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
        Commodity Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {data.map((item) => (
            <div
              key={item.symbol}
              onClick={() => openChart(item.tvSymbol)}
              className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 bg-black border-gray-800"
            >
              {/* HEADER */}
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/logo.png";
                  }}
                  className="w-6 h-6"
                />
                <p className="text-gray-300 text-sm">
                  {item.symbol}
                </p>
              </div>

              {/* PRICE */}
              <p className="text-xl font-bold text-white mt-2">
                ${item.price.toFixed(2)}
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

              {/* MINI CANDLE */}
              {renderCandles(item.candles)}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}