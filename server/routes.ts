import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertWatchlistSchema } from "@shared/schema";
import { z } from 'zod';

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user", async (req, res) => {
    // For simplicity, we'll just return the first user
    const user = await storage.getUser(1);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    // For simplicity, we'll just return the first portfolio
    const portfolio = await storage.getPortfolio(1);
    
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    
    res.json(portfolio);
  });

  // Watchlist routes
  app.get("/api/watchlist", async (req, res) => {
    // For simplicity, we'll just get watchlist for user 1
    const watchlist = await storage.getWatchlistByUserId(1);
    res.json(watchlist);
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const data = insertWatchlistSchema.parse(req.body);
      const watchlistItem = await storage.createWatchlistItem(data);
      res.status(201).json(watchlistItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid watchlist data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create watchlist item" });
    }
  });

  app.delete("/api/watchlist/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    const success = await storage.deleteWatchlistItem(id);
    
    if (!success) {
      return res.status(404).json({ message: "Watchlist item not found" });
    }
    
    res.status(204).end();
  });

  // Order routes
  app.get("/api/orders", async (req, res) => {
    // For simplicity, we'll just get orders for user 1
    const orders = await storage.getOrdersByUserId(1);
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const data = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(data);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.delete("/api/orders/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    const success = await storage.deleteOrder(id);
    
    if (!success) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(204).end();
  });

  app.post("/api/orders/cancel-all", async (req, res) => {
    // For simplicity, we'll just cancel all orders for user 1
    const success = await storage.deleteAllOrdersByUserId(1);
    
    if (!success) {
      return res.status(500).json({ message: "Failed to cancel all orders" });
    }
    
    res.status(204).end();
  });

  // Position routes
  app.get("/api/positions", async (req, res) => {
    // For simplicity, we'll just get positions for user 1
    const positions = await storage.getPositionsByUserId(1);
    res.json(positions);
  });

  app.post("/api/positions/:id/close", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    const position = await storage.getPosition(id);
    
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    
    // In a real app, this would create a market order to close the position
    // For simplicity, we'll just delete the position
    const success = await storage.deletePosition(id);
    
    if (!success) {
      return res.status(500).json({ message: "Failed to close position" });
    }
    
    res.status(204).end();
  });

  // Transaction routes
  app.get("/api/transactions", async (req, res) => {
    // For simplicity, we'll just get transactions for user 1
    const transactions = await storage.getTransactionsByUserId(1);
    res.json(transactions);
  });

  // Chart data
  app.get("/api/chart/:symbol/:timeframe", async (req, res) => {
    const { symbol, timeframe } = req.params;
    
    // Get the instrument
    let instrumentId = 1; // Default to BTC
    
    if (symbol !== 'BTCUSD') {
      const instrument = await storage.getInstrumentBySymbol(symbol, 'COINBASE');
      
      if (!instrument) {
        return res.status(404).json({ message: "Instrument not found" });
      }
      
      instrumentId = instrument.id;
    }
    
    // Get the OHLC data for the past day
    const end = new Date();
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
    
    const data = await storage.getOHLCData(instrumentId, timeframe, start, end);
    
    if (data.length === 0) {
      // For demo, if no data is found, return mock data
      const mockData = [
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
      
      return res.json(mockData);
    }
    
    // Format the data for the chart
    const formattedData = data.map(item => ({
      timestamp: new Date(item.timestamp).getTime(),
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
      volume: Number(item.volume),
    }));
    
    res.json(formattedData);
  });

  const httpServer = createServer(app);

  return httpServer;
}
