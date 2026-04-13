import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    // 🔥 FIX: ensure clean symbol format
    const tvSymbol = symbol.includes(":")
      ? symbol
      : `BINANCE:${symbol.toUpperCase()}USDT`;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_top_toolbar: false,
    });

    ref.current.appendChild(script);
  }, [symbol]);

  return <div ref={ref} className="w-full h-[100%]" />;
}