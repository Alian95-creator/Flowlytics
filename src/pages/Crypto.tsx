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
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // 🔥 LOAD WATCHLIST
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  // 🔥 SAVE WATCHLIST
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // 🔥 FETCH DATA (REALTIME REFRESH)
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1"
        )
        .then((res) => {
          setCoins(res.data);
          if (!selectedCoin) setSelectedCoin(res.data[0]);
        })
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // update tiap 10 detik

    return () => clearInterval(interval);
  }, []);

  // 🔍 FILTER
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search coin..."
          className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-800"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        <div className="space-y-2">

          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className={`flex items-center justify-between p-3 rounded cursor-pointer transition
                ${
                  selectedCoin?.id === coin.id
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

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-sm">
                  ${coin.current_price.toLocaleString()}
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
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-4">

        {selectedCoin && (
          <>
            <h2 className="text-xl font-bold mb-4">
              {selectedCoin.name} / USDT
            </h2>

            {/* TRADINGVIEW */}
            <TradingViewChart
              symbol={selectedCoin.symbol.toUpperCase()}
            />
          </>
        )}
      </div>
    </div>
  );
}