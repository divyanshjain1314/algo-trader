import React, { useState } from 'react';
import { 
  ArrowUpDown, Eye, BarChart, Camera, 
  RefreshCw, RotateCw
} from 'lucide-react';
import { OHLC, TimeInterval } from '@/lib/types';
import { TIME_INTERVALS } from '@/lib/constants';
import CandlestickChart from './candlestick-chart';
import TradingTools from './trading-tools';
import PriceScale from './price-scale';

interface ChartPanelProps {
  symbol: string;
  data: OHLC[];
  intervals: TimeInterval[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({ 
  symbol, 
  data, 
  intervals = TIME_INTERVALS 
}) => {
  const [activeInterval, setActiveInterval] = useState<string>('1m');
  const [activeTab, setActiveTab] = useState<string>('CHART');
  
  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  const change = lastCandle.close - prevCandle.close;
  const percentChange = (change / prevCandle.close) * 100;

  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));

  return (
    <div className="flex flex-col border-r border-border w-full overflow-auto  h-full border border-[#d3d3d3] py-3">
      {/* Tab Navigation */}
      {/* <div className="flex bg-secondary border-b border-border">
        <button 
          className={`tab-button ${activeTab === 'CHART' ? 'tab-button-active' : ''}`}
          onClick={() => setActiveTab('CHART')}
        >
          CHART
        </button>
        <button 
          className={`tab-button ${activeTab === 'ORDERBOOK' ? 'tab-button-active' : ''}`}
          onClick={() => setActiveTab('ORDERBOOK')}
        >
          ORDERBOOK
        </button>
        <div className="flex-grow"></div>
        <button className="px-2 text-lg">&times;</button>
      </div> */}

      {/* Chart Controls */}
      <div className="bg-card border-b border-border px-2 py-1 flex items-center">
        <div className="font-bold mr-2">{symbol}</div>
        <button className="w-6 h-6 flex items-center justify-center bg-accent rounded-sm hover:bg-muted mr-2">
          <span className="text-xl">+</span>
        </button>
        
        <div className="flex border border-border rounded-sm mr-2">
          {intervals.slice(0, 3).map((interval) => (
            <button 
              key={interval.value}
              className={`px-2 py-0.5 ${activeInterval === interval.value ? 'bg-accent' : ''}`}
              onClick={() => setActiveInterval(interval.value)}
            >
              {interval.label}
            </button>
          ))}
          <button className="px-2 py-0.5 flex items-center">
            <span className="ml-1">▼</span>
          </button>
        </div>
        
        <div className="flex space-x-1">
          <button className="tool-button" title="Compare">
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <button className="tool-button" title="View">
            <Eye className="h-4 w-4" />
          </button>
        </div>
        
        <div className="ml-4 flex items-center space-x-1">
          <button className="tool-button" title="Bar Chart">
            <BarChart className="h-4 w-4" />
          </button>
          <button className="flex items-center space-x-1 px-2 py-0.5 bg-accent rounded-sm hover:bg-muted">
            <span className="text-xs">Indicators</span>
            <span>▼</span>
          </button>
          <button className="tool-button" title="Take Screenshot">
            <Camera className="h-4 w-4" />
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
        <div className={`flex items-center ${change >= 0 ? 'positive' : 'negative'}`}>
          <span>{change >= 0 ? '+' : ''}{change.toFixed(2)}</span>
          <span className="ml-1">({change >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-muted-foreground">Vol •</span>
          <span>BTC</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-1 bg-card">
        <TradingTools />
        <CandlestickChart data={data} />
        <PriceScale min={minPrice} max={maxPrice} />
        
        {/* Time Scale is part of the chart library but we'd add it here if manually implementing */}
        <div className="absolute left-0 right-0 bottom-0 h-5 bg-card border-t border-border flex justify-between px-8 text-xs text-muted-foreground">
          <div>05:00</div>
          <div>06:00</div>
          <div>07:00</div>
        </div>
        
        {/* Chart Controls (Bottom Right) */}
        <div className="absolute right-24 bottom-6 flex space-x-1">
          <button className="w-6 h-6 flex items-center justify-center bg-accent rounded-sm hover:bg-muted text-xs">0</button>
          <button className="w-6 h-6 flex items-center justify-center bg-accent rounded-sm hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPanel;
