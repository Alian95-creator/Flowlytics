import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RevenueChart from "../components/RevenueChart";

const mapSymbol: any = {
  xauusd: "GC=F", // Gold
  oilusd: "CL=F", // Oil
  copperusd: "HG=F", // Copper
};

export default function Commodity() {
  const { symbol } = useParams();
  const [chart, setChart] = useState<any[]>([]);

  useEffect(() => {
    if (symbol) fetchCommodity(symbol);
  }, [symbol]);

  async function fetchCommodity(sym: string) {
    try {
      const ticker = mapSymbol[sym];

      const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1mo&interval=1d`
      );

      const data = await res.json();

      const result = data.chart.result[0];

      const prices = result.indicators.quote[0].close;
      const timestamps = result.timestamp;

      const formatted = prices.map((p: number, i: number) => ({
        date: new Date(timestamps[i] * 1000).toLocaleDateString(),
        price: p,
      }));

      setChart(formatted);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">
        {symbol?.toUpperCase()} Chart
      </h1>

      <RevenueChart data={chart} />
    </div>
  );
}