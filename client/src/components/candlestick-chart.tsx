import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import { OHLC } from '@/lib/types';
import { useTheme } from '@/lib/theme-context';

interface CandlestickChartProps {
  data: OHLC[];
  width?: number;
  height?: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ 
  data, 
  width = 800, 
  height = 320 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const { theme } = useTheme();
  
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        if (chartRef.current) {
          const container = chartContainerRef.current;
          if (container) {
            const newWidth = container.clientWidth - 75; // Account for price scale and tools
            const newHeight = container.clientHeight - 20; // Account for time scale
            chartRef.current.applyOptions({ width: newWidth, height: newHeight });
          }
        }
      };

      // Clean up previous chart if it exists
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }

      // Create new chart with theme-dependent styles
      const chart = createChart(chartContainerRef.current, {
        width: width - 75, // Account for price scale and tools
        height: height - 20, // Account for time scale
        layout: {
          background: { 
            type: ColorType.Solid as const, 
            color: isDarkMode ? 'rgba(30, 30, 30, 1)' : 'rgba(255, 255, 255, 1)' 
          },
          textColor: isDarkMode ? '#9E9E9E' : '#333333',
        },
        grid: {
          vertLines: { color: isDarkMode ? '#333' : '#e0e0e0' },
          horzLines: { color: isDarkMode ? '#333' : '#e0e0e0' },
        },
        crosshair: {
          mode: 0,
          vertLine: {
            width: 1,
            color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            style: 1,
          },
          horzLine: {
            width: 1,
            color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            style: 1,
          },
        },
        timeScale: {
          borderColor: isDarkMode ? '#333' : '#e0e0e0',
          timeVisible: true,
        },
        rightPriceScale: {
          borderColor: isDarkMode ? '#333' : '#e0e0e0',
        },
      });

      // Create candlestick series using v4.0.1 API
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4CAF50',
        downColor: '#FF5252',
        borderVisible: false,
        wickUpColor: '#4CAF50',
        wickDownColor: '#FF5252',
      });

      // Format data for the chart - For v4.0.1, time needs to be a proper UTCTimestamp format
      const formattedData = data.map((item) => {
        // Convert timestamp to a proper format for the chart
        return {
          time: Math.floor(item.timestamp / 1000) as unknown as number,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        };
      });

      // Cast the entire array to any to avoid TypeScript errors
      candlestickSeries.setData(formattedData as any);

      // Add a price line at the last price
      if (formattedData.length > 0) {
        const lastPrice = formattedData[formattedData.length - 1].close;
        candlestickSeries.createPriceLine({
          price: lastPrice,
          color: '#2D7AF6',
          lineWidth: 1,
          lineStyle: 2, // Dashed line
          axisLabelVisible: true,
          title: lastPrice.toString(),
        });
      }

      chartRef.current = chart;
      seriesRef.current = candlestickSeries;

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
      };
    }
  }, [data, width, height, isDarkMode]);

  // Update chart data if it changes
  useEffect(() => {
    if (seriesRef.current) {
      const formattedData = data.map((item) => ({
        time: Math.floor(item.timestamp / 1000) as unknown as number,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      // Cast to any to avoid TypeScript errors
      seriesRef.current.setData(formattedData as any);
    }
  }, [data]);

  return (
    <div className="chart-container ml-8 w-full h-full relative">
      <div ref={chartContainerRef} className="w-full h-full" />
      <div className="absolute left-10 bottom-8 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </div>
    </div>
  );
};

export default CandlestickChart;
