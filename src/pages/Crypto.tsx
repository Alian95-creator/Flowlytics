import { useEffect, useState } from "react";
import axios from "axios";
import TradingViewChart from "../components/TradingViewChart";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function Crypto() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  // FETCH DATA
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1"
      )
      .then((res) => setCoins(res.data))
      .catch(console.error);
  }, []);

  // FILTER
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">Crypto Market</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search coin..."
        className="w-full p-2 mb-6 rounded bg-gray-200 dark:bg-gray-800"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
            className="p-4 rounded-xl cursor-pointer border border-gray-300 dark:border-gray-700 hover:scale-105 transition bg-gray-100 dark:bg-gray-900"
          >
            <div className="flex justify-between">
              <h2>{coin.name}</h2>
              <span
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>

            <p className="text-xl font-bold">
              ${coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* DETAIL */}
      {selectedCoin && (
        <div className="mt-10 p-6 rounded-xl bg-gray-200 dark:bg-gray-900">

          <h2 className="text-xl font-bold mb-4">
            {selectedCoin.name} Chart
          </h2>

          <TradingViewChart symbol={selectedCoin.symbol.toUpperCase()} />
        </div>
      )}
    </div>
  );
}