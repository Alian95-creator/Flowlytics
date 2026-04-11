import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerId = `tv_${symbol.replace(/[^a-zA-Z0-9]/g, "")}`;

    containerRef.current.innerHTML = `<div id="${containerId}" style="height:100%; width:100%"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: containerId,
          autosize: true,
          symbol: symbol,
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
        });
      }
    };

    document.body.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-800"
    />
  );
}