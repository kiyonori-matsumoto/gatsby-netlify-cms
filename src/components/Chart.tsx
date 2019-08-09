import React from "react";
import TradingViewWidget from "react-tradingview-widget";
import { Image } from "rbx";

const Chart = (props: any) => (
  <Image.Container size="16by9">
    <div className="has-ratio">
      <TradingViewWidget {...props} autosize />
    </div>
  </Image.Container>
);

export default Chart;
