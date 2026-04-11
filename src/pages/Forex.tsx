import { useEffect, useState } from "react";

export default function Forex() {
  const [rates, setRates] = useState<any>(null);

  useEffect(() => {
    fetchRates();
  }, []);

  async function fetchRates() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr,usd,sgd,cny"
    );
    const data = await res.json();

    setRates({
      usd: data.tether.usd,
      idr: data.tether.idr,
      sgd: data.tether.sgd,
      cny: data.tether.cny,
    });
  }

  if (!rates) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">IDR Comparison</h1>

      <div className="bg-white p-4 rounded shadow">
        <p>IDR → USD: {(rates.idr / rates.usd).toFixed(2)}</p>
        <p>IDR → SGD: {(rates.idr / rates.sgd).toFixed(2)}</p>
        <p>IDR → CNY: {(rates.idr / rates.cny).toFixed(2)}</p>
      </div>
    </div>
  );
}