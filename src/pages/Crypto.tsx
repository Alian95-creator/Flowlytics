import { useEffect, useState } from "react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  total_volume: number;
};

type GlobalData = {
  btcDominance: number;
  totalMarketCap: number;
  totalVolume: number;
};

export default function Crypto() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState<GlobalData | null>(null);

  useEffect(() => {
    fetchCoins();
    fetchGlobal();
  }, []);

  useEffect(() => {
    const f = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, coins]);

  async function fetchCoins() {
    try {
      const res = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
          )
      );

      const data = await res.json();
      setCoins(data);
      setFiltered(data);
      setLoading(false);
    } catch (err) {
      console.error("coins error", err);
      setLoading(false);
    }
  }

  async function fetchGlobal() {
    try {
      const res = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent("https://api.coingecko.com/api/v3/global")
      );

      const json = await res.json();
      const data = json.data;

      setGlobal({
        btcDominance: data.market_cap_percentage.btc,
        totalMarketCap: data.total_market_cap.usd,
        totalVolume: data.total_volume.usd,
      });
    } catch (err) {
      console.error("global error", err);
    }
  }

  function formatPrice(p: number) {
    return `$${p.toLocaleString()}`;
  }

  function getSummary() {
    if (!coins.length || !global) return null;

    const sortedGain = [...coins].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    const sortedLoss = [...coins].sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    );

    const sortedVolume = [...coins].sort(
      (a, b) => b.total_volume - a.total_volume
    );

    return {
      topGainer: sortedGain[0],
      topLoser: sortedLoss[0],
      mostActive: sortedVolume[0],
      sentiment: global.btcDominance > 50 ? "Bearish 🔴" : "Bullish 🟢",
    };
  }

  // 🔥 AI INSIGHT ENGINE
  function getAIInsight(summary: any, global: any) {
    if (!summary || !global) return [];

    const insights: string[] = [];

    if (global.btcDominance > 50) {
      insights.push(
        "BTC dominance tinggi → altcoin cenderung melemah (market risk-off)."
      );
    } else {
      insights.push(
        "BTC dominance turun → altcoin mulai kuat (bullish rotation)."
      );
    }

    if (summary.topGainer.price_change_percentage_24h > 5) {
      insights.push(
        `${summary.topGainer.symbol.toUpperCase()} sedang naik tajam → indikasi breakout / hype.`
      );
    }

    if (summary.topLoser.price_change_percentage_24h < -5) {
      insights.push(
        `${summary.topLoser.symbol.toUpperCase()} turun dalam → potensi panic sell.`
      );
    }

    if (summary.mostActive.total_volume > 1_000_000_000) {
      insights.push(
        `${summary.mostActive.symbol.toUpperCase()} volume tinggi → aktivitas trader meningkat.`
      );
    }

    if (insights.length === 0) {
      insights.push("Market relatif stabil tanpa sinyal ekstrem.");
    }

    return insights;
  }

  const summary = getSummary();
  const aiInsights = getAIInsight(summary, global);

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Crypto Market</h1>
        <p className="text-sm text-gray-500">
          Real-time market overview & AI insights
        </p>
      </div>

      {/* SUMMARY */}
      {global && summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">BTC Dominance</p>
            <p className="text-lg font-bold">
              {global.btcDominance.toFixed(2)}%
            </p>
          </div>

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">Top Gainer</p>
            <p className="text-green-400 font-bold">
              {summary.topGainer.symbol.toUpperCase()} +{summary.topGainer.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">Top Loser</p>
            <p className="text-red-400 font-bold">
              {summary.topLoser.symbol.toUpperCase()} {summary.topLoser.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">Sentiment</p>
            <p className="font-bold">{summary.sentiment}</p>
          </div>

        </div>
      )}

      {/* 🔥 AI INSIGHT */}
      {aiInsights && (
        <div className="card-dark p-4 rounded-xl border border-gray-800 space-y-2">

          <h2 className="text-purple-400 font-bold">
            🤖 AI Market Insight
          </h2>

          <ul className="space-y-1 text-sm text-gray-300">
            {aiInsights.map((text, i) => (
              <li key={i}>• {text}</li>
            ))}
          </ul>

        </div>
      )}

      {/* SEARCH */}
      <div className="card-dark flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-800">
        <span className="text-gray-500">🔍</span>
        <input
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="card-dark rounded-2xl border border-gray-800 overflow-hidden">

        <div className="grid grid-cols-3 p-3 text-xs text-gray-500 border-b border-gray-800">
          <span>Asset</span>
          <span className="text-center">Price</span>
          <span className="text-right">24h</span>
        </div>

        {loading ? (
          <p className="text-gray-500 p-4">Loading...</p>
        ) : (
          filtered.map((c) => {
            const change = c.price_change_percentage_24h;

            return (
              <div
                key={c.id}
                className="grid grid-cols-3 items-center px-3 py-4 border-b border-gray-900 hover:bg-white/5 transition"
              >

                <div className="flex items-center gap-3">
                  <img src={c.image} className="w-6 h-6 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">
                      {c.symbol.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {c.name}
                    </p>
                  </div>
                </div>

                <p className="text-center text-sm font-semibold">
                  {formatPrice(c.current_price)}
                </p>

                <p
                  className={`text-right text-sm font-bold ${
                    change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {change >= 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </p>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}