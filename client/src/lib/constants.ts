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
];

export const DEFAULT_TICKER = 'BTCUSD';
export const DEFAULT_EXCHANGE = 'COINBASE';
export const DEFAULT_TIMEFRAME = '1m';
