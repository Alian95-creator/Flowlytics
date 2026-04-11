import { useEffect, useState } from "react";
import Card from "../components/Card";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard() {
  const [btcData, setBtcData] = useState<any[]>([]);
  const [price, setPrice] = useState<number | null>(null);
  const [supply, setSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBitcoin();
  }, []);

  async function fetchBitcoin() {
    try {
      // current data
      const res1 = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      const data1 = await res1.json();

      setPrice(data1.market_data.current_price.usd);
      setSupply(data1.market_data.circulating_supply);

      // chart data
      const res2 = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
      );
      const data2 = await res2.json();

      const formatted = data2.prices.map((item: any) => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1],
      }));

      setBtcData(formatted);
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
      
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="BTC Price" value={`$${price?.toLocaleString()}`} />
        <Card
          title="Circulating Supply"
          value={`${supply?.toLocaleString()} BTC`}
        />
        <Card title="Market Status" value="Live 🚀" />
      </div>

      {/* CHART */}
      <RevenueChart data={btcData} />

    </div>
  );
}