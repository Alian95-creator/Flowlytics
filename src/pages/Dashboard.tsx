import { useEffect, useState } from "react";
import Card from "../components/Card";
import RevenueChart from "../components/RevenueChart";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [btc, setBtc] = useState<number>(0);

  useEffect(() => {
    fetchMetrics();
    fetchBTC();
  }, []);

  async function fetchMetrics() {
    const { data } = await supabase.from("metrics").select("*");
    if (data) setMetrics(data);
  }

  async function fetchBTC() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    const data = await res.json();
    setBtc(data.market_data.current_price.usd);
  }

  const latest = metrics[metrics.length - 1];

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Revenue" value={`$${latest?.revenue || 0}`} />
        <Card title="Users" value={`${latest?.users || 0}`} />
        <Card title="Churn" value={`${latest?.churn || 0}%`} />
        <Card title="BTC Price" value={`$${btc}`} />
      </div>

      <RevenueChart data={metrics} />

    </div>
  );
}