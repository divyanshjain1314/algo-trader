// User and Account types
export interface User {
  id: number;
  username: string;
  name: string;
  panNumber: string;
}

export interface Portfolio {
  id: number;
  userId: number;
  marketValue: number;
  positions: number;
  investment: number;
  profit: number;
  type: string;
}

// Instrument and Market Data types
export interface Instrument {
  id: number;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
}

export interface Price {
  instrumentId: number;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
  percentChange: number;
  volume: number;
  bid: number;
  ask: number;
  lastUpdated: string;
}

export interface OHLC {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Trading types
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'NEW' | 'SUBMITTED' | 'PARTIAL' | 'FILLED' | 'CANCELLED' | 'REJECTED' | 'EXECUTING';
export type TimeInForce = 'GTC' | 'IOC' | 'FOK' | 'DAY';

export interface Order {
  id: number;
  userId: number;
  instrumentId: number;
  portfolioId: number;
  type: OrderType;
  side: OrderSide;
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: TimeInForce;
  status: OrderStatus;
  filledQuantity: number;
  account: string;
  exchange: string;
  symbol: string;
  margin?: boolean;
  takeProfit?: number;
  stopLoss?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: number;
  userId: number;
  instrumentId: number;
  portfolioId: number;
  quantity: number;
  averagePrice: number;
  marketPrice: number;
  marketValue: number;
  cost: number;
  unrealizedPnL: number;
  realizedPnL: number;
  account: string;
  exchange: string;
  symbol: string;
  currency: string;
}

export interface Transaction {
  id: number;
  userId: number;
  instrumentId: number;
  portfolioId: number;
  orderId: number;
  side: OrderSide;
  quantity: number;
  price: number;
  timestamp: string;
  exchange: string;
  symbol: string;
  account: string;
}

// Watchlist types
export interface WatchlistItem {
  id: number;
  userId: number;
  instrumentId: number;
  exchange: string;
  symbol: string;
  account: string;
  last: number;
  volume: number;
  bid: number;
  ask: number;
  askVolume: number;
}

export interface TimeInterval {
  value: string;
  label: string;
}
