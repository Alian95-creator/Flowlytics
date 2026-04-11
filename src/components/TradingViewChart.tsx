import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    // CLEAR dulu (biar gak double render)
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: container.current?.id,
          autosize: true,
          symbol: symbol || "BINANCE:BTCUSDT",
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
        });
      }
    };

    document.body.appendChild(script);
  }, [symbol]);

  return (
    <div
      id="tradingview_chart"
      ref={container}
      className="w-full h-[400px] md:h-[600px]"
    />
  );
}