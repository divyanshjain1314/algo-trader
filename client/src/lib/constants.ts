import { TimeInterval } from './types';

export const TIME_INTERVALS: TimeInterval[] = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
];

export const MOCK_USER = {
  id: 1,
  username: 'narender',
  name: 'Narender Yadav',
  panNumber: 'ACTPY6135L',
};

export const MOCK_PORTFOLIO = {
  id: 1,
  userId: 1,
  marketValue: 2016889.68,
  positions: 2,
  investment: 25000,
  profit: 4000,
  type: 'STOCKS',
};

const generateMockData = (count = 100) => {
  const data = [];
  let timestamp = 1630000000000; // Starting timestamp
  let open = 28632.44;

  for (let i = 0; i < count; i++) {
    const high = open + (Math.random() * 10);
    const low = open - (Math.random() * 10);
    const close = low + (Math.random() * (high - low));
    const volume = Math.floor(Math.random() * 200) + 50; // Random volume

    data.push({
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });

    // Move to the next timestamp (+ 1 minute)
    // timestamp += 60000;
    open = close; // Next open is previous close
  }

  return data;
};

// export const MOCK_OHLC_DATA = generateMockData(100);

export const MOCK_OHLC_DATA = [
  { timestamp: 1630000000000, open: 28632.44, high: 28638.87, low: 28628.69, close: 28634.36, volume: 100 },
  { timestamp: 1630000060000, open: 28634.36, high: 28640.12, low: 28630.25, close: 28636.54, volume: 85 },
  { timestamp: 1630000120000, open: 28636.54, high: 28642.33, low: 28632.18, close: 28638.72, volume: 92 },
  { timestamp: 1630000180000, open: 28638.72, high: 28644.56, low: 28634.12, close: 28640.91, volume: 78 },
  { timestamp: 1630000240000, open: 28640.91, high: 28646.78, low: 28636.05, close: 28643.09, volume: 110 },
  { timestamp: 1630000300000, open: 28643.09, high: 28649.01, low: 28637.99, close: 28645.28, volume: 95 },
  { timestamp: 1630000360000, open: 28645.28, high: 28651.23, low: 28639.92, close: 28647.46, volume: 88 },
  { timestamp: 1630000420000, open: 28647.46, high: 28653.46, low: 28641.86, close: 28649.65, volume: 102 },
  { timestamp: 1630000480000, open: 28649.65, high: 28655.68, low: 28643.79, close: 28651.83, volume: 115 },
  { timestamp: 1630000540000, open: 28651.83, high: 28657.91, low: 28645.73, close: 28654.02, volume: 98 },
  { timestamp: 1630000600000, open: 28654.02, high: 28659.10, low: 28648.75, close: 28656.22, volume: 90 },
  { timestamp: 1630000660000, open: 28656.22, high: 28661.34, low: 28650.69, close: 28658.41, volume: 105 },
  { timestamp: 1630000720000, open: 28658.41, high: 28663.57, low: 28652.62, close: 28660.61, volume: 110 },
  { timestamp: 1630000780000, open: 28660.61, high: 28665.79, low: 28654.55, close: 28662.80, volume: 115 },
  { timestamp: 1630000840000, open: 28662.80, high: 28668.02, low: 28656.48, close: 28664.99, volume: 120 },
  { timestamp: 1630000900000, open: 28664.99, high: 28670.25, low: 28658.41, close: 28667.19, volume: 125 },
  { timestamp: 1630000960000, open: 28667.19, high: 28672.48, low: 28660.34, close: 28669.38, volume: 130 },
  { timestamp: 1630001020000, open: 28669.38, high: 28674.71, low: 28662.27, close: 28671.57, volume: 135 },
  { timestamp: 1630001080000, open: 28671.57, high: 28676.94, low: 28664.20, close: 28673.77, volume: 140 },
  { timestamp: 1630001140000, open: 28673.77, high: 28679.17, low: 28666.13, close: 28675.96, volume: 145 },
  { timestamp: 1630001200000, open: 28675.96, high: 28681.40, low: 28668.06, close: 28678.15, volume: 150 },
  { timestamp: 1630001260000, open: 28678.15, high: 28683.63, low: 28670.00, close: 28680.35, volume: 155 },
  { timestamp: 1630001320000, open: 28680.35, high: 28685.86, low: 28671.93, close: 28682.54, volume: 160 },
  { timestamp: 1630001380000, open: 28682.54, high: 28688.09, low: 28673.86, close: 28684.73, volume: 165 },
  { timestamp: 1630001440000, open: 28684.73, high: 28690.32, low: 28675.79, close: 28686.93, volume: 170 },
  { timestamp: 1630001500000, open: 28686.93, high: 28692.55, low: 28677.72, close: 28689.12, volume: 175 },
  { timestamp: 1630001560000, open: 28689.12, high: 28694.78, low: 28679.65, close: 28691.31, volume: 180 },
  { timestamp: 1630001620000, open: 28691.31, high: 28697.01, low: 28681.58, close: 28693.51, volume: 185 },
  { timestamp: 1630001680000, open: 28693.51, high: 28699.24, low: 28683.51, close: 28695.70, volume: 190 },
  { timestamp: 1630001740000, open: 28695.70, high: 28701.47, low: 28685.44, close: 28697.89, volume: 195 },
  { timestamp: 1630001800000, open: 28697.89, high: 28703.70, low: 28687.37, close: 28700.09, volume: 200 },
  { timestamp: 1630001860000, open: 28700.09, high: 28705.93, low: 28689.30, close: 28702.28, volume: 205 },
  { timestamp: 1630001920000, open: 28702.28, high: 28708.16, low: 28691.23, close: 28704.47, volume: 210 },
  { timestamp: 1630001980000, open: 28704.47, high: 28710.39, low: 28693.16, close: 28706.67, volume: 215 },
  { timestamp: 1630002040000, open: 28706.67, high: 28712.62, low: 28695.09, close: 28708.86, volume: 220 },
  { timestamp: 1630002100000, open: 28708.86, high: 28714.85, low: 28697.02, close: 28711.05, volume: 225 },
  { timestamp: 1630002160000, open: 28711.05, high: 28717.08, low: 28698.95, close: 28713.25, volume: 230 },
  { timestamp: 1630002220000, open: 28713.25, high: 28719.31, low: 28700.88, close: 28715.44, volume: 235 },
  { timestamp: 1630002280000, open: 28715.44, high: 28721.54, low: 28702.81, close: 28717.63, volume: 240 },
];



export const DEFAULT_TICKER = 'BTCUSD';
export const DEFAULT_EXCHANGE = 'COINBASE';
export const DEFAULT_TIMEFRAME = '1m';
