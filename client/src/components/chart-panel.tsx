import React, { useState } from "react";
import {
  ArrowUpDown,
  Eye,
  BarChart,
  Camera,
  RefreshCw,
  RotateCw,
  ChevronDown,
} from "lucide-react";
import { OHLC, TimeInterval } from "@/lib/types";
import { TIME_INTERVALS } from "@/lib/constants";
import CandlestickChart from "./candlestick-chart";
import TradingTools from "./trading-tools";
import PriceScale from "./price-scale";

interface ChartPanelProps {
  symbol: string;
  data: OHLC[];
  intervals: TimeInterval[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({
  symbol,
  data,
  intervals = TIME_INTERVALS,
}) => {
  const [activeInterval, setActiveInterval] = useState<string>("1m");
  const [activeTab, setActiveTab] = useState<string>("CHART");

  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  const change = lastCandle.close - prevCandle.close;
  const percentChange = (change / prevCandle.close) * 100;

  const minPrice = Math.min(...data.map((d) => d.low));
  const maxPrice = Math.max(...data.map((d) => d.high));

  return (
    <div className="flex flex-col border-r border-border w-full overflow-auto  h-full border border-[#d3d3d3]">
      <div className="bg-card border-b border-border px-2 py-1 ">
        <div className="flex items-center justify-around border border-border rounded-sm">
          <div className="font-bold mr-2">{symbol}</div>

          <button className="w-6 h-6 flex items-center justify-center bg-accent hover:bg-muted mr-2 rounded-full border border-[#000]">
            <span className="text-xl ">+</span>
          </button>
          <div>
            {intervals.slice(0, 3).map((interval, index) => (
              <button
                key={interval.value}
                className={`px-2 py-0.5 ${
                  activeInterval === interval.value
                    ? "bg-accent text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveInterval(interval.value)}
              >
                {interval.label}
              </button>
            ))}
            <button
              type="button"
              className="ml-2"
              data-tooltip="Bar's style"
              aria-label="Bar's style"
              aria-haspopup="menu"
            >
              <div className="arrow-merBkM5y">
                <div className="arrowWrap-merBkM5y">
                  <span role="img" className="icon-WB2y0EnP" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 8"
                      width="16"
                      height="8"
                    >
                      <path
                        fill="currentColor"
                        d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>
          <button type="button">
            <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                width="28"
                height="28"
              >
                <path
                  fill="currentColor"
                  d="M19 6h-1v7h-3v1h3v8h1v-3h3v-1h-3V6ZM11 7h-1v13H7v1h3v2h1V10h3V9h-3V7Z"
                ></path>
              </svg>
            </span>
          </button>
          <button
            aria-label="Candles"
            role="radio"
            aria-checked="true"
            data-value="candle"
            type="button"
            className="button-b3Cgff6l button-neROVfUe button-GwQQdU8S apply-common-tooltip isActive-GwQQdU8S isInteractive-GwQQdU8S isGrouped-GwQQdU8S accessible-GwQQdU8S"
            data-tooltip="Candles"
          >
            <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
                <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
                <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
                <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
              </svg>
            </span>
          </button>
          <button
            aria-label="Area"
            role="radio"
            aria-checked="false"
            data-value="area"
            type="button"
            className="button-b3Cgff6l button-neROVfUe last-neROVfUe button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S isGrouped-GwQQdU8S accessible-GwQQdU8S"
            data-tooltip="Area"
          >
            <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                width="28"
                height="28"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="m25.35 5.35-9.5 9.5-.35.36-.35-.36-4.65-4.64-8.15 8.14-.7-.7 8.5-8.5.35-.36.35.36 4.65 4.64 9.15-9.14.7.7ZM2 21h1v1H2v-1Zm2-1H3v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1V9h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1H8v1H7v1H6v1H5v1H4v1Zm1 0v1H4v-1h1Zm1 0H5v-1h1v1Zm1 0v1H6v-1h1Zm0-1H6v-1h1v1Zm1 0H7v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1H8v1H7v1h1v1Zm1 0v1H8v-1h1Zm0-1H8v-1h1v1Zm1 0H9v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1h1v1Zm1 0v1h-1v-1h1Zm0-1v-1h-1v1h1Zm0 0v1h1v1h1v-1h-1v-1h-1Zm6 2v-1h1v1h-1Zm2 0v1h-1v-1h1Zm0-1h-1v-1h1v1Zm1 0h-1v1h1v1h1v-1h1v1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h1v1Zm1 0h-1v1h1v-1Zm0-1h1v1h-1v-1Zm0-1h1v-1h-1v1Zm0 0v1h-1v-1h1Zm-4 3v1h-1v-1h1Z"
                ></path>
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="menu-b3Cgff6l button-merBkM5y apply-common-tooltip accessible-merBkM5y"
            data-tooltip="Bar's style"
            aria-label="Bar's style"
            aria-haspopup="menu"
          >
            <div className="arrow-merBkM5y">
              <div className="arrowWrap-merBkM5y">
                <span role="img" className="icon-WB2y0EnP" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 8"
                    width="16"
                    height="8"
                  >
                    <path
                      fill="currentColor"
                      d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </button>
          <button className="flex items-center space-x-1 px-2 py-0.5 bg-accent rounded-sm hover:bg-muted">
            <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                width="28"
                height="28"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  d="M6 12l4.8-4.8a1 1 0 0 1 1.4 0l2.7 2.7a1 1 0 0 0 1.3.1L23 5"
                ></path>
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M19 12a1 1 0 0 0-1 1v4h-3v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v4h17V13a1 1 0 0 0-1-1h-3zm0 10h3v-9h-3v9zm-1 0v-4h-3v4h3zm-4-4.5V22h-3v-6h3v1.5zM10 22v-3H7v3h3z"
                ></path>
              </svg>
            </span>
            <span className="text-xs">Indicators</span>
          </button>
          <button
            type="button"
            className="button-merBkM5y apply-common-tooltip accessible-merBkM5y"
            data-tooltip="Take a snapshot"
            aria-label="Take a snapshot"
            aria-haspopup="menu"
          >
            <div
              id="header-toolbar-screenshot"
              data-role="button"
              className="iconButton-OhqNVIYA button-GwQQdU8S"
            >
              <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Trade Info */}
      <div className="bg-card border-b border-border px-3 py-1 flex items-center text-xs space-x-1">
        <div>COINBASE:{symbol} • 1</div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">O</span>
          <span>{lastCandle.open.toFixed(2)}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">H</span>
          <span className="positive">{lastCandle.high.toFixed(2)}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">L</span>
          <span>{lastCandle.low.toFixed(2)}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">C</span>
          <span>{lastCandle.close.toFixed(2)}</span>
        </div>
        <div
          className={`flex items-center ${
            change >= 0 ? "positive" : "negative"
          }`}
        >
          <span>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}
          </span>
          <span className="ml-1">
            ({change >= 0 ? "+" : ""}
            {percentChange.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">Vol •</span>
          <span>BTC</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-1 bg-card pb-10">
        <TradingTools />
        <CandlestickChart data={data} />

        {/* Time Scale is part of the chart library but we'd add it here if manually implementing */}
        <div className="absolute left-0 right-0 bottom-0 h-5 bg-card border-t border-border flex justify-between px-8 text-xs text-muted-foreground">
          <div className=""></div>
          <div>05:00</div>
          <div>06:00</div>
          <div>07:00</div>
        </div>

        {/* Chart Controls (Bottom Right) */}
        <div className="absolute right-24 bottom-6 flex space-x-1">
          <button className="w-6 h-6 flex items-center justify-center bg-accent rounded-sm hover:bg-muted text-xs">
            0
          </button>
          <button className="w-6 h-6 flex items-center justify-center bg-accent rounded-sm hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPanel;
