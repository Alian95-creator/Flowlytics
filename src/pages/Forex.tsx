import { useEffect, useState } from "react";

type Rate = {
  label: string;
  value: number;
};

export default function Forex() {
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    fetchRates();
  }, []);

  async function fetchRates() {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/IDR"
    );
    const data = await res.json();

    const selected = [
      "USD","SGD","CNY","EUR","JPY",
      "GBP","AUD","CAD","SAR","KRW",
    ];

    const formatted = selected.map((cur) => ({
      label: `IDR → ${cur}`,
      value: data.rates[cur],
    }));

    setRates(formatted);
  }

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold dark:text-white">
        IDR Comparison 💱
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {rates.map((r, i) => (
          <div
            key={i}
            className="dark:card-dark p-5 rounded-2xl transition-all duration-200 hover:scale-[1.03]"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {r.label}
            </p>

            <p className="text-2xl font-bold mt-2 neon-green">
              {r.value.toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}