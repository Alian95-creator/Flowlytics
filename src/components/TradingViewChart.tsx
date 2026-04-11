import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const widget = document.createElement("div");
    widget.id = "tv_chart";
    ref.current.appendChild(widget);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tv_chart",
        symbol: symbol,
        interval: "15",
        theme: "dark",
        style: "1",
        autosize: true,
      });
    };

    ref.current.appendChild(script);
  }, [symbol]);

  return <div ref={ref} className="w-full h-[500px]" />;
}