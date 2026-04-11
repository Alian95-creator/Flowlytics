import { useEffect, useState } from "react";

export default function Dashboard() {
  const [coins, setCoins] = useState<any[]>([]);
  const [idrToUsdt, setIdrToUsdt] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000); // refresh 10s
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      // TOP 10 COINS
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
      );
      const data = await res.json();
      setCoins(data);

      // IDR → USDT
      const rateRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr"
      );
      const rateData = await rateRes.json();

      const usdtPriceInIdr = rateData.tether.idr;
      setIdrToUsdt(1 / usdtPriceInIdr);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) {
    return <div className="p-6">Loading crypto data...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-2xl shadow border transition">
        <h2 className="text-lg font-semibold mb-2">
          IDR → USDT
        </h2>
        <p className="text-2xl font-bold">
          1 IDR ≈ {idrToUsdt.toFixed(8)} USDT
        </p>
      </div>

      {/* TOP 10 TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <h2 className="p-4 font-semibold text-lg">
          Top 10 Crypto (Live)
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{coin.market_cap_rank}</td>

                <td className="flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-5 h-5"
                  />
                  {coin.symbol.toUpperCase()}
                </td>

                <td>${coin.current_price.toLocaleString()}</td>

                <td
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>

                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}