import { useEffect, useState } from "react";

export default function Forex() {
  const [rates, setRates] = useState<any>({});
  const [history, setHistory] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const pairs = [
    "USD","SGD","CNY","EUR","JPY",
    "GBP","AUD","SAR","MYR","THB",
  ];

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 3000);
    return () => clearInterval(interval);
  }, []);

  async function fetchRates() {
    try {
      setLoading(true);

      const res = await fetch(
        "https://open.er-api.com/v6/latest/IDR"
      );
      const data = await res.json();

      if (data?.rates) {
        setRates(data.rates);

        setHistory((prev: any) => {
          const updated: any = { ...prev };

          pairs.forEach((p) => {
            const arr = updated[p] || [];
            updated[p] = [...arr, data.rates[p]].slice(-10);
          });

          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 500); // smooth feel
    }
  }

  function getPrediction(data: number[]) {
    if (!data || data.length < 3) return "Neutral";
    const diff = data[data.length - 1] - data[0];
    if (diff > 0) return "Bullish";
    if (diff < 0) return "Bearish";
    return "Neutral";
  }

  function getSentiment(data: number[]) {
    if (!data || data.length < 2) return 50;
    const changes = data.slice(1).map((v, i) => v - data[i]);
    const positive = changes.filter((c) => c > 0).length;
    return Math.round((positive / changes.length) * 100);
  }

  function getColor(score: number) {
    if (score > 70) return "bg-green-500";
    if (score > 40) return "bg-yellow-500";
    return "bg-red-500";
  }

  // 🦴 SKELETON CARD
  function SkeletonCard() {
    return (
      <div className="card-dark p-4 space-y-3">
        <div className="h-4 w-20 shimmer rounded"></div>
        <div className="h-6 w-24 shimmer rounded"></div>
        <div className="h-3 w-32 shimmer rounded"></div>
        <div className="h-2 w-full shimmer rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <h1 className="text-xl font-bold dark:text-white">
        🤖 AI Forex Insight
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">

        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : pairs.map((p) => {
              const data = history[p] || [];
              const current = data[data.length - 1];

              const prediction = getPrediction(data);
              const sentiment = getSentiment(data);

              return (
                <div
                  key={p}
                  className="card-dark p-4 hover-glow space-y-3 animate-fadeIn"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">
                      IDR → {p}
                    </span>
                    <span className="text-xs text-gray-500">
                      LIVE
                    </span>
                  </div>

                  <p className="text-xl font-bold text-white">
                    {current ? current.toFixed(6) : "..."}
                  </p>

                  <div className="text-sm">
                    <span className="text-gray-400">
                      AI:
                    </span>{" "}
                    <span
                      className={`font-bold ${
                        prediction === "Bullish"
                          ? "neon-green"
                          : prediction === "Bearish"
                          ? "neon-red"
                          : "text-yellow-400"
                      }`}
                    >
                      {prediction}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Sentiment</span>
                      <span>{sentiment}%</span>
                    </div>

                    <div className="w-full h-2 bg-gray-800 rounded">
                      <div
                        className={`h-2 rounded ${getColor(
                          sentiment
                        )}`}
                        style={{ width: `${sentiment}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}