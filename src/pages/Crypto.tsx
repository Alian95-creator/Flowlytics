import { useEffect, useState } from "react";
import RevenueChart from "../components/RevenueChart";

export default function Crypto() {
  const [coins, setCoins] = useState<any[]>([]);
  const [chart, setChart] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );
    const data = await res.json();
    setCoins(data);

    // default chart BTC
    fetchChart("bitcoin");
  }

  async function fetchChart(id: string) {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
    );
    const data = await res.json();

    const formatted = data.prices.map((p: any) => ({
      date: new Date(p[0]).toLocaleDateString(),
      price: p[1],
    }));

    setChart(formatted);
  }

  return (
    <div className="space-y-6">
      
      <RevenueChart data={chart} />

      <div className="bg-white rounded shadow">
        {coins.map((c) => (
          <div
            key={c.id}
            onClick={() => fetchChart(c.id)}
            className="p-3 border-b cursor-pointer hover:bg-gray-50"
          >
            {c.name} (${c.current_price})
          </div>
        ))}
      </div>

    </div>
  );
}