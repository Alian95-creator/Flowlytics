import { useEffect, useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

export default function Crypto() {
  const [coins, setCoins] = useState<any[]>([]);
  const [selected, setSelected] = useState("BINANCE:BTCUSDT");

  useEffect(() => {
    fetchCoins();
  }, []);

  async function fetchCoins() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );
    const data = await res.json();
    setCoins(data);
  }

  return (
    <div className="space-y-6">

      <TradingViewChart symbol={selected} />

      <div className="dark:card-dark rounded-2xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="border-b border-gray-800 text-gray-400">
            <tr>
              <th className="p-3 text-left">Coin</th>
              <th>Price</th>
              <th>24h</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((c) => {
              const positive = c.price_change_percentage_24h > 0;

              return (
                <tr
                  key={c.id}
                  onClick={() =>
                    setSelected(`BINANCE:${c.symbol.toUpperCase()}USDT`)
                  }
                  className="cursor-pointer border-b border-gray-900 hover:bg-white/5 transition"
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={c.image} className="w-5 h-5" />
                    {c.symbol.toUpperCase()}
                  </td>

                  <td className="dark:text-white">
                    ${c.current_price.toLocaleString()}
                  </td>

                  <td className={positive ? "neon-green" : "neon-red"}>
                    {c.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}