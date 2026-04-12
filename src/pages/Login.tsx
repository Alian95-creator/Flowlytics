import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Ticker = {
  symbol: string;
  price: number;
  change: number;
};

export default function Login() {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  // 🔥 FETCH REAL DATA (COINGECKO)
  async function fetchTicker() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1"
      );
      const data = await res.json();

      const mapped = data.map((c: any) => ({
        symbol: c.symbol.toUpperCase(),
        price: c.current_price,
        change: c.price_change_percentage_24h,
      }));

      setTickers(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 10000); // refresh 10 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* 🔥 TICKER BAR */}
      <div className="absolute top-0 w-full overflow-hidden border-b border-green-500/20 bg-black/80 backdrop-blur">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {tickers.concat(tickers).map((item, i) => (
            <div key={i} className="flex items-center gap-2 mx-6 text-sm">
              <span className="text-gray-400">{item.symbol}</span>
              <span className="text-white">${item.price}</span>
              <span
                className={
                  item.change > 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {item.change?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* 💎 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8"
      >

        <div className="flex justify-center mb-6">
          <img src="/logo.png" className="w-10 h-10" />
        </div>

        <h1 className="text-green-400 text-xl text-center font-semibold">
          Flowlytics
        </h1>

        <p className="text-gray-400 text-sm text-center mb-6">
          Real-time market intelligence
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-green-500 text-black font-semibold
          hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition"
        >
          Continue with Google
        </button>

      </motion.div>

      {/* 🔥 MARQUEE STYLE */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}
      </style>

    </div>
  );
}