import { useEffect, useState } from "react";

type Rate = {
  label: string;
  value: number;
};

export default function Forex() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();

    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchRates() {
    try {
      const res = await fetch(
        "https://api.exchangerate-api.com/v4/latest/IDR"
      );
      const data = await res.json();

      const selected = [
        "USD",
        "SGD",
        "CNY",
        "EUR",
        "JPY",
        "GBP",
        "AUD",
        "CAD",
        "SAR",
        "KRW",
      ];

      const formatted: Rate[] = selected.map((cur) => ({
        label: `IDR → ${cur}`,
        value: data.rates[cur],
      }));

      setRates(formatted);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) {
    return <div className="p-6 animate-pulse">Loading forex...</div>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold dark:text-white">
        IDR Comparison 💱
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {rates.map((r, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 dark:text-white p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:scale-[1.02]"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {r.label}
            </p>

            <p className="text-2xl font-bold mt-2">
              {r.value.toLocaleString()}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}