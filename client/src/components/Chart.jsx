
import React, { useEffect, useRef, useContext } from 'react';
import {ConnectToChartContext} from "../pages/Convert"

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const {srcToken, destToken} = useContext(ConnectToChartContext);

  
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

      function createWidget(srcToken, destToken) {
       
        let Token1="BYBIT:ETHUSDT";
        if(srcToken=="ETH" && destToken =="BTC")
        Token1 = "BYBIT:ETHBTC";

        if (document.getElementById('tradingview_78993') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: "700",
            height: "400",
            symbol: Token1,//"BYBIT:ETHBTC"  "BYBIT:ETHUSDT" "BYBIT:BTCUSDT"
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
    []
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='tradingview_78993' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text"></span></a>
      </div>
    </div>
  );
}
