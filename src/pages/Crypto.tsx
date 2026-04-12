import { useEffect, useState } from "react";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

type Coin = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  image: string;
  tvSymbol: string;
  candles: Candle[];
};

const baseCoins = [
  {
    name: "Bitcoin",
    symbol: "BTC/USDT",
    price: 65000,
    tvSymbol: "BINANCE:BTCUSDT",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH/USDT",
    price: 3200,
    tvSymbol: "BINANCE:ETHUSDT",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Solana",
    symbol: "SOL/USDT",
    price: 150,
    tvSymbol: "BINANCE:SOLUSDT",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "BNB",
    symbol: "BNB/USDT",
    price: 600,
    tvSymbol: "BINANCE:BNBUSDT",
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    name: "XRP",
    symbol: "XRP/USDT",
    price: 0.6,
    tvSymbol: "BINANCE:XRPUSDT",
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE/USDT",
    price: 0.15,
    tvSymbol: "BINANCE:DOGEUSDT",
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  },
];

export default function Crypto() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateData();
    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, []);

  function generateData() {
    const results = baseCoins.map((coin) => {
      const change = Math.random() * 2 - 1;
      const newPrice = coin.price + change * coin.price * 0.01;

      return {
        ...coin,
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
        Crypto Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {data.map((coin) => (
            <div
              key={coin.symbol}
              onClick={() => openChart(coin.tvSymbol)}
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
                <p className="text-gray-300 text-sm">
                  {coin.symbol}
                </p>
              </div>

              {/* PRICE */}
              <p className="text-xl font-bold text-white mt-2">
                ${coin.price.toFixed(2)}
              </p>

              {/* CHANGE */}
              <p
                className={`text-sm ${
                  coin.change > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.change.toFixed(2)}%
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