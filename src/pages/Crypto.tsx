import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradingViewChart from "../components/TradingViewChart";

export default function Crypto() {
  const [coins, setCoins] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();

  const symbol = params.get("symbol") || "BTC";

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const result = coins.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const sym = c.symbol?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        sym.includes(search.toLowerCase())
      );
    });

    setFiltered(result);
  }, [search, coins]);

  async function fetchCoins() {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        setCoins([]);
        setFiltered([]);
        return;
      }

      setCoins(data);
      setFiltered(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setCoins([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(sym: string) {
    setParams({ symbol: sym });
  }

  return (
    <div className="space-y-6">

      {/* CHART */}
      <div className="dark:card-dark p-4 rounded-2xl">
        <TradingViewChart
          key={symbol}
          symbol={`BINANCE:${symbol}USDT`}
        />
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border border-gray-800 text-white outline-none focus:border-white transition"
      />

      {/* LIST */}
      <div className="dark:card-dark rounded-2xl max-h-[500px] overflow-y-auto">

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500 p-4">
            Loading coins...
          </p>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 p-4">
            No coins found...
          </p>
        )}

        {/* DATA */}
        {!loading &&
          filtered.map((c) => {
            const price =
              typeof c.current_price === "number"
                ? c.current_price
                : 0;

            const change =
              typeof c.price_change_percentage_24h === "number"
                ? c.price_change_percentage_24h
                : 0;

            const symbolUpper = c.symbol
              ? c.symbol.toUpperCase()
              : "UNKNOWN";

            const active = symbolUpper === symbol;

            return (
              <div
                key={c.id}
                onClick={() => handleSelect(symbolUpper)}
                className={`flex items-center justify-between p-4 border-b border-gray-900 cursor-pointer transition
                  ${
                    active
                      ? "bg-white/5 neon-green"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-6 h-6"
                    onError={(e) =>
                      (e.currentTarget.style.display = "none")
                    }
                  />

                  <div>
                    <p className="text-white">
                      {c.name || "Unknown Coin"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {symbolUpper}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white">
                    ${price.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm ${
                      change > 0
                        ? "neon-green"
                        : "neon-red"
                    }`}
                  >
                    {Number.isFinite(change)
                      ? change.toFixed(2)
                      : "0.00"}
                    %
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}