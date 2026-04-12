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
      // @ts-ignore
      new window.TradingView.widget({
        container_id: ref.current,
        width: "100%",
        height: 400,
        symbol: `BINANCE:${symbol}USDT`,
        interval: "D",
        theme: "dark",
        style: "1",
        locale: "en",
      });
    };

    ref.current.appendChild(script);
  }, [symbol]);

  return <div ref={ref} />;
}