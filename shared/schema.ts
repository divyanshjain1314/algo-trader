import { pgTable, text, serial, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  panNumber: text("pan_number"),
});

// Portfolio table
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  marketValue: numeric("market_value").notNull(),
  positions: integer("positions").notNull(),
  investment: numeric("investment").notNull(),
  profit: numeric("profit").notNull(),
  type: text("type").notNull(),
});

// Instrument table
export const instruments = pgTable("instruments", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  exchange: text("exchange").notNull(),
});

// Watchlist table
export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  instrumentId: integer("instrument_id").notNull().references(() => instruments.id),
  exchange: text("exchange").notNull(),
  symbol: text("symbol").notNull(),
  account: text("account"),
  last: numeric("last"),
  volume: numeric("volume"),
  bid: numeric("bid"),
  ask: numeric("ask"),
  askVolume: numeric("ask_volume"),
});

// Order table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  instrumentId: integer("instrument_id").notNull().references(() => instruments.id),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  type: text("type").notNull(),
  side: text("side").notNull(),
  quantity: numeric("quantity").notNull(),
  price: numeric("price"),
  stopPrice: numeric("stop_price"),
  timeInForce: text("time_in_force").notNull(),
  status: text("status").notNull(),
  filledQuantity: numeric("filled_quantity").notNull(),
  account: text("account").notNull(),
  exchange: text("exchange").notNull(),
  symbol: text("symbol").notNull(),
  margin: boolean("margin").default(false),
  takeProfit: numeric("take_profit"),
  stopLoss: numeric("stop_loss"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Position table
export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  instrumentId: integer("instrument_id").notNull().references(() => instruments.id),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  quantity: numeric("quantity").notNull(),
  averagePrice: numeric("average_price").notNull(),
  marketPrice: numeric("market_price").notNull(),
  marketValue: numeric("market_value").notNull(),
  cost: numeric("cost").notNull(),
  unrealizedPnL: numeric("unrealized_pnl").notNull(),
  realizedPnL: numeric("realized_pnl").notNull(),
  account: text("account").notNull(),
  exchange: text("exchange").notNull(),
  symbol: text("symbol").notNull(),
  currency: text("currency").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Transaction table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  instrumentId: integer("instrument_id").notNull().references(() => instruments.id),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  orderId: integer("order_id").references(() => orders.id),
  side: text("side").notNull(),
  quantity: numeric("quantity").notNull(),
  price: numeric("price").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  exchange: text("exchange").notNull(),
  symbol: text("symbol").notNull(),
  account: text("account").notNull(),
});

// OHLC (candlestick) table
export const ohlc = pgTable("ohlc", {
  id: serial("id").primaryKey(),
  instrumentId: integer("instrument_id").notNull().references(() => instruments.id),
  timestamp: timestamp("timestamp").notNull(),
  timeframe: text("timeframe").notNull(),
  open: numeric("open").notNull(),
  high: numeric("high").notNull(),
  low: numeric("low").notNull(),
  close: numeric("close").notNull(),
  volume: numeric("volume").notNull(),
});

// Zod schemas for insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  panNumber: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).pick({
  userId: true,
  marketValue: true,
  positions: true,
  investment: true,
  profit: true,
  type: true,
});

export const insertInstrumentSchema = createInsertSchema(instruments).pick({
  symbol: true,
  name: true,
  type: true,
  exchange: true,
});

export const insertWatchlistSchema = createInsertSchema(watchlist).pick({
  userId: true,
  instrumentId: true,
  exchange: true,
  symbol: true,
  account: true,
  last: true,
  volume: true,
  bid: true,
  ask: true,
  askVolume: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  instrumentId: true,
  portfolioId: true,
  type: true,
  side: true,
  quantity: true,
  price: true,
  stopPrice: true,
  timeInForce: true,
  status: true,
  filledQuantity: true,
  account: true,
  exchange: true,
  symbol: true,
  margin: true,
  takeProfit: true,
  stopLoss: true,
});

export const insertPositionSchema = createInsertSchema(positions).pick({
  userId: true,
  instrumentId: true,
  portfolioId: true,
  quantity: true,
  averagePrice: true,
  marketPrice: true,
  marketValue: true,
  cost: true,
  unrealizedPnL: true,
  realizedPnL: true,
  account: true,
  exchange: true,
  symbol: true,
  currency: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  instrumentId: true,
  portfolioId: true,
  orderId: true,
  side: true,
  quantity: true,
  price: true,
  exchange: true,
  symbol: true,
  account: true,
});

export const insertOhlcSchema = createInsertSchema(ohlc).pick({
  instrumentId: true,
  timestamp: true,
  timeframe: true,
  open: true,
  high: true,
  low: true,
  close: true,
  volume: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type Instrument = typeof instruments.$inferSelect;
export type InsertInstrument = z.infer<typeof insertInstrumentSchema>;

export type WatchlistItem = typeof watchlist.$inferSelect;
export type InsertWatchlistItem = z.infer<typeof insertWatchlistSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Position = typeof positions.$inferSelect;
export type InsertPosition = z.infer<typeof insertPositionSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type OHLC = typeof ohlc.$inferSelect;
export type InsertOHLC = z.infer<typeof insertOhlcSchema>;
