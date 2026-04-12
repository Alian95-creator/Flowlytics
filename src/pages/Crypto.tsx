import { useEffect, useState } from "react";
import axios from "axios";
import TradingViewChart from "../components/TradingViewChart";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function Crypto() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  // ⭐ LOAD WATCHLIST
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  // ⭐ SAVE WATCHLIST
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // 🔥 FETCH COINS (VIA VERCEL API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/crypto");
        setCoins(res.data);

        if (!selectedCoinId && res.data.length > 0) {
          setSelectedCoinId(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedCoinId]);

  // ⚡ REALTIME PRICE (BINANCE WEBSOCKET)
  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/!miniTicker@arr"
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const updated: Record<string, number> = {};

      data.forEach((coin: any) => {
        const symbol = coin.s.replace("USDT", "").toLowerCase();
        updated[symbol] = parseFloat(coin.c);
      });

      setPrices(updated);
    };

    return () => ws.close();
  }, []);

  // 🔍 FILTER
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 SELECTED COIN
  const selectedCoin = coins.find((c) => c.id === selectedCoinId);

  // ⭐ TOGGLE WATCHLIST
  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-1/3 border-r border-gray-300 dark:border-gray-800 p-4 overflow-y-auto">

        <h1 className="text-xl font-bold mb-4">Markets</h1>

        <input
          type="text"
          placeholder="Search coin..."
          className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-800"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-2">

          {filteredCoins.map((coin) => {
            const livePrice =
              prices[coin.symbol] ?? coin.current_price;

            return (
              <div
                key={coin.id}
                onClick={() => setSelectedCoinId(coin.id)}
                className={`flex items-center justify-between p-3 rounded cursor-pointer transition
                  ${
                    selectedCoinId === coin.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-900 hover:scale-[1.02]"
                  }`}
              >
                {/* LEFT */}
                <div className="flex items-center gap-2">
                  <img src={coin.image} className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold">
                      {coin.symbol.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {coin.name}
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="text-sm">
                    ${livePrice.toLocaleString()}
                  </p>

                  <p
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500 text-xs"
                        : "text-red-500 text-xs"
                    }
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </p>
                </div>

                {/* ⭐ WATCHLIST */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(coin.id);
                  }}
                  className="ml-2"
                >
                  {watchlist.includes(coin.id) ? "⭐" : "☆"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-4">

        {selectedCoin && (
          <>
            <h2 className="text-xl font-bold mb-4">
              {selectedCoin.name} / USDT
            </h2>

            <TradingViewChart
              symbol={selectedCoin.symbol.toUpperCase()}
            />
          </>
        )}
      </div>
    </div>
  );
}