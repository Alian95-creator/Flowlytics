import { useEffect, useState } from "react";
import Card from "../components/Card";
import RevenueChart from "../components/RevenueChart";

const coins = [
  { id: "bitcoin", label: "BTC" },
  { id: "ethereum", label: "ETH" },
  { id: "solana", label: "SOL" },
  { id: "matic-network", label: "MATIC" },
];

export default function Dashboard() {
  const [selected, setSelected] = useState("bitcoin");
  const [price, setPrice] = useState<number>(0);
  const [prevPrice, setPrevPrice] = useState<number>(0);
  const [chart, setChart] = useState<any[]>([]);
  const [idr, setIdr] = useState(1000000);
  const [conversion, setConversion] = useState<any>(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // auto refresh

    return () => clearInterval(interval);
  }, [selected]);

  async function fetchData() {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selected}`
      );
      const data = await res.json();

      setPrevPrice(price);
      setPrice(data.market_data.current_price.usd);

      // chart
      const chartRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selected}/market_chart?vs_currency=usd&days=30`
      );
      const chartData = await chartRes.json();

      const formatted = chartData.prices.map((p: any) => ({
        date: new Date(p[0]).toLocaleDateString(),
        price: p[1],
      }));

      setChart(formatted);

      // conversion
      const idrRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,matic-network,tether&vs_currencies=idr"
      );
      const idrData = await idrRes.json();

      setConversion({
        btc: idr / idrData.bitcoin.idr,
        eth: idr / idrData.ethereum.idr,
        sol: idr / idrData.solana.idr,
        matic: idr / idrData["matic-network"].idr,
        usdt: idr / idrData.tether.idr,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const isUp = price > prevPrice;

  return (
    <div className="space-y-6">

      {/* COIN SELECT */}
      <div className="flex gap-2">
        {coins.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`px-3 py-1 rounded ${
              selected === c.id
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Price (USD)"
          value={`$${price.toLocaleString()}`}
          change={isUp ? "+ Live" : "- Live"}
        />
        <Card
          title="Trend"
          value={isUp ? "Bullish 🟢" : "Bearish 🔴"}
        />
        <Card title="Auto Refresh" value="10s ⚡" />
      </div>

      {/* CHART */}
      <RevenueChart data={chart} />

      {/* CONVERTER */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <h3 className="font-semibold mb-3">
          Rupiah → Crypto Converter
        </h3>

        <input
          type="number"
          value={idr}
          onChange={(e) => setIdr(Number(e.target.value))}
          className="border px-3 py-2 rounded w-full mb-4"
        />

        {conversion && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div>BTC: {conversion.btc.toFixed(6)}</div>
            <div>ETH: {conversion.eth.toFixed(6)}</div>
            <div>SOL: {conversion.sol.toFixed(4)}</div>
            <div>MATIC: {conversion.matic.toFixed(2)}</div>
            <div>USDT: {conversion.usdt.toFixed(2)}</div>
          </div>
        )}
      </div>

    </div>
  );
}