import React, { useEffect } from "react";
import { any } from "prop-types";

declare interface window {
  TradingView: any;
}

const Chart = () => {
  useEffect(() => {
    new TradingView.widget({
      width: 980,
      height: 610,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "Light",
      style: "1",
      locale: "ja",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      studies: ["RSI@tv-basicstudies"],
      container_id: "tradingview_f7d73"
    });
  }, []);
  return (
    <>
      <div id="tradingview_f7d73" />
    </>
  );
};

export default Chart;

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div id="tradingview_f7d73"></div>
//   <div class="tradingview-widget-copyright">TradingView提供の<a href="https://jp.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPLチャート</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
//   <script type="text/javascript">
//   new TradingView.widget(
//   {
//   "width": 980,
//   "height": 610,
//   "symbol": "NASDAQ:AAPL",
//   "interval": "D",
//   "timezone": "Etc/UTC",
//   "theme": "Light",
//   "style": "1",
//   "locale": "ja",
//   "toolbar_bg": "#f1f3f6",
//   "enable_publishing": false,
//   "allow_symbol_change": true,
//   "studies": [
//     "RSI@tv-basicstudies"
//   ],
//   "container_id": "tradingview_f7d73"
// }
//   );
//   </script>
// </div>
// <!-- TradingView Widget END -->
