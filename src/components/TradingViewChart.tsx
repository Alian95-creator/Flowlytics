import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: ref.current.id,
        symbol: symbol,
        interval: "D",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1f2937",
        enable_publishing: false,
        allow_symbol_change: true,
        autosize: true,
      });
    };

    ref.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      id="tradingview_chart"
      ref={ref}
      className="w-full h-[500px]"
    />
  );
}