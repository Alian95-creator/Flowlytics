import { useEffect, useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

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

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  // INIT
  useEffect(() => {
    fetchCoins();
    fetchGlobal();
  }, []);

  // FILTER
  useEffect(() => {
    const q = search.toLowerCase();

    setFiltered(
      coins.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.symbol?.toLowerCase().includes(q)
      )
    );
  }, [search, coins]);

  // FETCH COINS
  async function fetchCoins() {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      );

      const data = await res.json();

      if (!Array.isArray(data)) return;

      const safe = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        current_price: c.current_price,
        image: c.image,
        price_change_percentage_24h: c.price_change_percentage_24h,
        total_volume: c.total_volume,
      }));

      setCoins(safe);
      setFiltered(safe);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // GLOBAL
  async function fetchGlobal() {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/global");
      const json = await res.json();

      const data = json?.data;

      if (!data) return;

      setGlobal({
        btcDominance: data.market_cap_percentage.btc,
        totalMarketCap: data.total_market_cap.usd,
        totalVolume: data.total_volume.usd,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // REALTIME PRICE ONLY
  async function refreshPrices() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      );

      const data = await res.json();
      if (!Array.isArray(data)) return;

      setCoins((prev) =>
        prev.map((coin) => {
          const updated = data.find((c: any) => c.id === coin.id);
          if (!updated) return coin;

          return {
            ...coin,
            current_price: updated.current_price,
            price_change_percentage_24h:
              updated.price_change_percentage_24h,
            total_volume: updated.total_volume,
          };
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const interval = setInterval(refreshPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  function formatPrice(p: number) {
    return `$${Number(p || 0).toLocaleString()}`;
  }

  function getSummary() {
    if (!coins.length || !global) return null;

    const sortedGain = [...coins].sort(
      (a, b) =>
        (b.price_change_percentage_24h || 0) -
        (a.price_change_percentage_24h || 0)
    );

    const sortedLoss = [...coins].sort(
      (a, b) =>
        (a.price_change_percentage_24h || 0) -
        (b.price_change_percentage_24h || 0)
    );

    const sortedVolume = [...coins].sort(
      (a, b) => (b.total_volume || 0) - (a.total_volume || 0)
    );

    return {
      topGainer: sortedGain[0],
      topLoser: sortedLoss[0],
      mostActive: sortedVolume[0],
      sentiment: global.btcDominance > 50 ? "Bearish 🔴" : "Bullish 🟢",
    };
  }

  const summary = getSummary();

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Crypto Market</h1>
        <p className="text-sm text-gray-500">Live market overview</p>
      </div>

      {/* SEARCH */}
      <div className="card-dark flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-800">
        <span className="text-gray-500">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coin..."
          className="w-full bg-transparent outline-none text-sm"
        />
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
              {summary.topGainer?.symbol?.toUpperCase()}
            </p>
          </div>

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">Top Loser</p>
            <p className="text-red-400 font-bold">
              {summary.topLoser?.symbol?.toUpperCase()}
            </p>
          </div>

          <div className="card-dark p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-500">Sentiment</p>
            <p className="font-bold">{summary.sentiment}</p>
          </div>

        </div>
      )}

      {/* LIST */}
      <div className="card-dark rounded-2xl border border-gray-800 overflow-hidden">

        <div className="grid grid-cols-3 p-3 text-xs text-gray-500 border-b border-gray-800">
          <span>Asset</span>
          <span className="text-center">Price</span>
          <span className="text-right">24h</span>
        </div>

        {loading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : (
          filtered.map((c) => {
            const change = c.price_change_percentage_24h || 0;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCoin(c)}
                className="grid grid-cols-3 items-center px-3 py-4 border-b border-gray-900 hover:bg-white/5 transition cursor-pointer"
              >

                <div className="flex items-center gap-3">
                  <img src={c.image} className="w-6 h-6 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">
                      {c.symbol.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{c.name}</p>
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

      {/* 🚀 TRADINGVIEW MODAL */}
      {selectedCoin && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedCoin(null)}
        >
          <div
            className="w-[95%] md:w-[85%] h-[85%] bg-black border border-gray-800 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
              <h2 className="font-bold">
                {selectedCoin.symbol.toUpperCase()} / USDT
              </h2>

              <button onClick={() => setSelectedCoin(null)}>
                ✕
              </button>
            </div>

            <TradingViewChart symbol={selectedCoin.symbol} />
          </div>
        </div>
      )}

    </div>
  );
}