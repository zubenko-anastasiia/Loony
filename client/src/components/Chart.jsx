
import React, { useEffect, useRef, useContext } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget({ srcToken, destToken }) {
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
        let symbol;

        switch (true) {
          case (srcToken === 'ETH' && destToken === 'BTC') || (srcToken === 'BTC' && destToken === 'ETH'):
            symbol = 'BYBIT:ETHBTC';
            break;
          case (srcToken === 'ETH' && destToken === 'USDT') || (srcToken === 'USDT' && destToken === 'ETH'):
            symbol = 'BYBIT:ETHUSDT';
            break;
          case (srcToken === 'BTC' && destToken === 'USDT') || (srcToken === 'USDT' && destToken === 'BTC'):
            symbol = 'BYBIT:BTCUSDT';
            break;
          case (srcToken === 'LINK' && destToken === 'USDT') || (srcToken === 'USDT' && destToken === 'LINK'):
              symbol = 'BYBIT:LINKUSDT';
              break;
          case (srcToken === 'LINK' && destToken === 'ETH') || (srcToken === 'ETH' && destToken === 'LINK'):
              symbol = 'OKX:LINKETH';
              break;
          case (srcToken === 'LINK' && destToken === 'BTC') || (srcToken === 'BTC' && destToken === 'LINK'):
              symbol = 'OKX:LINKBTC';
              break;
          default:
            symbol = 'BYBIT:ETHUSDT'
            break;
        }

        

        if (document.getElementById('tradingview_78993') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: "700",
            height: "400",
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            watchlist: ["BYBIT:ETHBTC","BYBIT:BTCUSDT"],
            container_id: "tradingview_78993"
          });
        }
      }
    },
    [srcToken, destToken]
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='tradingview_78993' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">
          </span>
        </a>
      </div>
    </div>
  );
}
