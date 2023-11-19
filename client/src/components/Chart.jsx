
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_78993') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: "700",
            height: "400",
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            watchlist: ["BINANCE:ETHUSDT","BINANCE:SOLUSDT"],
            container_id: "tradingview_78993"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='tradingview_78993' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div>
    </div>
  );
}
