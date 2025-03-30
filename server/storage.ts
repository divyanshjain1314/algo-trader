import { 
  User, InsertUser, Portfolio, InsertPortfolio, 
  Instrument, InsertInstrument, WatchlistItem, InsertWatchlistItem,
  Order, InsertOrder, Position, InsertPosition, 
  Transaction, InsertTransaction, OHLC, InsertOHLC 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolios
  getPortfolio(id: number): Promise<Portfolio | undefined>;
  getPortfolioByUserId(userId: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: number, updates: Partial<Portfolio>): Promise<Portfolio | undefined>;
  
  // Instruments
  getInstrument(id: number): Promise<Instrument | undefined>;
  getInstrumentBySymbol(symbol: string, exchange: string): Promise<Instrument | undefined>;
  getAllInstruments(): Promise<Instrument[]>;
  createInstrument(instrument: InsertInstrument): Promise<Instrument>;
  
  // Watchlist
  getWatchlistItem(id: number): Promise<WatchlistItem | undefined>;
  getWatchlistByUserId(userId: number): Promise<WatchlistItem[]>;
  createWatchlistItem(item: InsertWatchlistItem): Promise<WatchlistItem>;
  deleteWatchlistItem(id: number): Promise<boolean>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;
  deleteAllOrdersByUserId(userId: number): Promise<boolean>;
  
  // Positions
  getPosition(id: number): Promise<Position | undefined>;
  getPositionsByUserId(userId: number): Promise<Position[]>;
  createPosition(position: InsertPosition): Promise<Position>;
  updatePosition(id: number, updates: Partial<Position>): Promise<Position | undefined>;
  deletePosition(id: number): Promise<boolean>;
  
  // Transactions
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // OHLC Data
  getOHLCData(instrumentId: number, timeframe: string, start: Date, end: Date): Promise<OHLC[]>;
  createOHLCData(data: InsertOHLC): Promise<OHLC>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, Portfolio>;
  private instruments: Map<number, Instrument>;
  private watchlist: Map<number, WatchlistItem>;
  private orders: Map<number, Order>;
  private positions: Map<number, Position>;
  private transactions: Map<number, Transaction>;
  private ohlcData: Map<number, OHLC>;

  private userIdCounter: number;
  private portfolioIdCounter: number;
  private instrumentIdCounter: number;
  private watchlistIdCounter: number;
  private orderIdCounter: number;
  private positionIdCounter: number;
  private transactionIdCounter: number;
  private ohlcIdCounter: number;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.instruments = new Map();
    this.watchlist = new Map();
    this.orders = new Map();
    this.positions = new Map();
    this.transactions = new Map();
    this.ohlcData = new Map();

    this.userIdCounter = 1;
    this.portfolioIdCounter = 1;
    this.instrumentIdCounter = 1;
    this.watchlistIdCounter = 1;
    this.orderIdCounter = 1;
    this.positionIdCounter = 1;
    this.transactionIdCounter = 1;
    this.ohlcIdCounter = 1;

    // Initialize with some data
    this.initializeData();
  }

  // Initialize with sample data
  private initializeData() {
    // Create a user
    const user: User = {
      id: 1,
      username: 'narender',
      password: 'hashed_password', // In a real app, this would be hashed
      name: 'Narender Yadav',
      panNumber: 'ACTPY6135L',
    };
    this.users.set(user.id, user);
    this.userIdCounter = 2;

    // Create a portfolio
    const portfolio: Portfolio = {
      id: 1,
      userId: user.id,
      marketValue: 2016889.68,
      positions: 2,
      investment: 25000,
      profit: 4000,
      type: 'STOCKS',
    };
    this.portfolios.set(portfolio.id, portfolio);
    this.portfolioIdCounter = 2;

    // Create some instruments
    const instruments: Instrument[] = [
      { id: 1, symbol: 'BTCUSD', name: 'Bitcoin USD', type: 'CRYPTO', exchange: 'COINBASE' },
      { id: 2, symbol: 'ETHUSD', name: 'Ethereum USD', type: 'CRYPTO', exchange: 'COINBASE' },
      { id: 3, symbol: 'EURUSD', name: 'Euro USD', type: 'FOREX', exchange: 'FX_BROKER' },
      { id: 4, symbol: 'GBPUSD', name: 'GBP USD', type: 'FOREX', exchange: 'FX_BROKER' },
      { id: 5, symbol: 'AAPL', name: 'Apple Inc', type: 'STOCK', exchange: 'SMART' },
      { id: 6, symbol: 'MSFT', name: 'Microsoft Corporation', type: 'STOCK', exchange: 'SMART' },
      { id: 7, symbol: 'C', name: 'Citigroup Inc', type: 'STOCK', exchange: 'SMART' },
      { id: 8, symbol: 'BA', name: 'Boeing Co', type: 'STOCK', exchange: 'SMART' },
      { id: 9, symbol: 'BMW', name: 'Bayerische Motoren Werke AG', type: 'STOCK', exchange: 'SMART' },
      { id: 10, symbol: 'VOW', name: 'Volkswagen AG', type: 'STOCK', exchange: 'SMART' },
      { id: 11, symbol: 'MSFT', name: 'Microsoft Corporation', type: 'STOCK', exchange: 'SMART' },
      { id: 12, symbol: 'AU', name: 'AngloGold Ashanti Ltd', type: 'STOCK', exchange: 'SMART' },
    ];

    instruments.forEach(instrument => {
      this.instruments.set(instrument.id, instrument);
    });
    this.instrumentIdCounter = instruments.length + 1;

    // Create watchlist items
    const watchlistItems: WatchlistItem[] = [
      { id: 1, userId: user.id, instrumentId: 6, exchange: 'SMART', symbol: 'MSFT', account: 'CoinAPI', last: 28631.55, volume: 0.020, bid: 28628.45, ask: 28632.25, askVolume: 0.008 },
      { id: 2, userId: user.id, instrumentId: 1, exchange: 'Coinbase Pro', symbol: 'BTCUSD', account: 'CoinAPI', last: 0.04525, volume: 3.36, bid: 0.04517, ask: 0.04519, askVolume: 2.06 },
      { id: 3, userId: user.id, instrumentId: 3, exchange: 'FX_BROKER', symbol: 'EURUSD', account: '-', last: 0, volume: 0, bid: 0, ask: 0, askVolume: 0 },
      { id: 4, userId: user.id, instrumentId: 3, exchange: 'FX_BROKER', symbol: 'EURUSD', account: '-', last: 0, volume: 0, bid: 0, ask: 0, askVolume: 0 },
      { id: 5, userId: user.id, instrumentId: 5, exchange: 'SMART', symbol: 'AAPL', account: '-', last: 0, volume: 0, bid: 0, ask: 0, askVolume: 0 },
    ];

    watchlistItems.forEach(item => {
      this.watchlist.set(item.id, item);
    });
    this.watchlistIdCounter = watchlistItems.length + 1;

    // Create some orders
    const orders: Order[] = [
      { 
        id: 1, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        type: 'LIMIT', 
        side: 'BUY', 
        quantity: 2, 
        price: 0.06, 
        stopPrice: undefined, 
        timeInForce: 'GTC', 
        status: 'EXECUTING', 
        filledQuantity: 2, 
        account: 'slm64', 
        exchange: 'Limited', 
        symbol: 'ETH', 
        margin: false, 
        takeProfit: undefined, 
        stopLoss: undefined, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      { 
        id: 2, 
        userId: user.id, 
        instrumentId: 3, 
        portfolioId: portfolio.id, 
        type: 'MARKET', 
        side: 'SELL', 
        quantity: 5500, 
        price: undefined, 
        stopPrice: undefined, 
        timeInForce: 'GTC', 
        status: 'SUBMITTED', 
        filledQuantity: 0, 
        account: 'slm63', 
        exchange: 'Market', 
        symbol: 'EUR', 
        margin: false, 
        takeProfit: undefined, 
        stopLoss: undefined, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      { 
        id: 3, 
        userId: user.id, 
        instrumentId: 3, 
        portfolioId: portfolio.id, 
        type: 'MARKET', 
        side: 'BUY', 
        quantity: 10450, 
        price: undefined, 
        stopPrice: undefined, 
        timeInForce: 'GTC', 
        status: 'SUBMITTED', 
        filledQuantity: 0, 
        account: 'slm62', 
        exchange: 'Market', 
        symbol: 'EUR', 
        margin: false, 
        takeProfit: undefined, 
        stopLoss: undefined, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      { 
        id: 4, 
        userId: user.id, 
        instrumentId: 5, 
        portfolioId: portfolio.id, 
        type: 'LIMIT', 
        side: 'SELL', 
        quantity: 154, 
        price: 150.3, 
        stopPrice: undefined, 
        timeInForce: 'GTC', 
        status: 'SUBMITTED', 
        filledQuantity: 0, 
        account: 'slm54', 
        exchange: 'Limited', 
        symbol: 'AAPL', 
        margin: false, 
        takeProfit: undefined, 
        stopLoss: undefined, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      { 
        id: 5, 
        userId: user.id, 
        instrumentId: 7, 
        portfolioId: portfolio.id, 
        type: 'MARKET', 
        side: 'SELL', 
        quantity: 175, 
        price: undefined, 
        stopPrice: undefined, 
        timeInForce: 'GTC', 
        status: 'PARTIAL', 
        filledQuantity: 173, 
        account: 'slm54', 
        exchange: 'Market', 
        symbol: 'C', 
        margin: false, 
        takeProfit: undefined, 
        stopLoss: undefined, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      }
    ];

    orders.forEach(order => {
      this.orders.set(order.id, order);
    });
    this.orderIdCounter = orders.length + 1;

    // Create some positions
    const positions: Position[] = [
      { 
        id: 1, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        quantity: 86.5, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: 0, 
        cost: 0, 
        unrealizedPnL: 0, 
        realizedPnL: 0, 
        account: 'Coinb', 
        exchange: 'MAR', 
        symbol: 'ETH', 
        currency: 'BTC',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 2, 
        userId: user.id, 
        instrumentId: 1, 
        portfolioId: portfolio.id, 
        quantity: 64.8, 
        averagePrice: 28000, 
        marketPrice: 0, 
        marketValue: 1860, 
        cost: 1848, 
        unrealizedPnL: -32, 
        realizedPnL: 0, 
        account: 'Coinb', 
        exchange: 'MAR', 
        symbol: 'BTC', 
        currency: '$',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 3, 
        userId: user.id, 
        instrumentId: 4, 
        portfolioId: portfolio.id, 
        quantity: -16.5, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: -207, 
        cost: 0, 
        unrealizedPnL: -55, 
        realizedPnL: 0, 
        account: 'FX_BR', 
        exchange: 'MAR', 
        symbol: 'GBP', 
        currency: '$',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 4, 
        userId: user.id, 
        instrumentId: 3, 
        portfolioId: portfolio.id, 
        quantity: 86.5, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: 0, 
        cost: 0, 
        unrealizedPnL: 0, 
        realizedPnL: 0, 
        account: 'FX_BR', 
        exchange: 'MAR', 
        symbol: 'EUR', 
        currency: 'CHF',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 5, 
        userId: user.id, 
        instrumentId: 3, 
        portfolioId: portfolio.id, 
        quantity: -240, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: -257, 
        cost: 0, 
        unrealizedPnL: -91, 
        realizedPnL: 0, 
        account: 'FX_BR', 
        exchange: 'MAR', 
        symbol: 'EUR', 
        currency: '$',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 6, 
        userId: user.id, 
        instrumentId: 5, 
        portfolioId: portfolio.id, 
        quantity: 595, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: -93.26, 
        cost: 0, 
        unrealizedPnL: -1.4, 
        realizedPnL: 0, 
        account: 'SMART', 
        exchange: 'MAR', 
        symbol: 'AAPL', 
        currency: '$',
        updatedAt: new Date().toISOString()
      },
      { 
        id: 7, 
        userId: user.id, 
        instrumentId: 7, 
        portfolioId: portfolio.id, 
        quantity: 524, 
        averagePrice: 0, 
        marketPrice: 0, 
        marketValue: -27.36, 
        cost: 0, 
        unrealizedPnL: -15, 
        realizedPnL: 0, 
        account: 'SMART', 
        exchange: 'MAR', 
        symbol: 'C', 
        currency: '$',
        updatedAt: new Date().toISOString()
      }
    ];

    positions.forEach(position => {
      this.positions.set(position.id, position);
    });
    this.positionIdCounter = positions.length + 1;

    // Create transactions
    const now = new Date();
    const transactions: Transaction[] = [
      { 
        id: 1, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 1, 
        side: 'BUY', 
        quantity: 2.00, 
        price: 0.04519, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 2, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 1, 
        side: 'BUY', 
        quantity: 2.00, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 3).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 3, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 2, 
        side: 'SELL', 
        quantity: 0.0158, 
        price: 0.04525, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 3 - 1000 * 10).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 4, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 2, 
        side: 'SELL', 
        quantity: 1.9420135, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 3 - 1000 * 20).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 5, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 3, 
        side: 'SELL', 
        quantity: 1.23, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 3 - 1000 * 30).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 6, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 3, 
        side: 'BUY', 
        quantity: 0.50324872, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 7, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 4, 
        side: 'BUY', 
        quantity: 1.71587764, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4 - 1000 * 15).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 8, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 4, 
        side: 'BUY', 
        quantity: 1.71587764, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4 - 1000 * 30).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 9, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 5, 
        side: 'BUY', 
        quantity: 0.33514354, 
        price: 0.04523, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 8).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 10, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 5, 
        side: 'BUY', 
        quantity: 0.96742808, 
        price: 0.04524, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4 - 1000 * 45).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 11, 
        userId: user.id, 
        instrumentId: 2, 
        portfolioId: portfolio.id, 
        orderId: 1, 
        side: 'BUY', 
        quantity: 2.64723089, 
        price: 0.04524, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4 - 1000 * 50).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'ETH/BTC', 
        account: 'CRYPTO3' 
      },
      { 
        id: 12, 
        userId: user.id, 
        instrumentId: 1, 
        portfolioId: portfolio.id, 
        orderId: 2, 
        side: 'SELL', 
        quantity: 0.01518057, 
        price: 28605.98, 
        timestamp: new Date(now.getTime() - 1000 * 60 * 4 - 1000 * 55).toISOString(), 
        exchange: 'Coinbase Pro', 
        symbol: 'BTCUSD', 
        account: 'CRYPTO3' 
      }
    ];

    transactions.forEach(transaction => {
      this.transactions.set(transaction.id, transaction);
    });
    this.transactionIdCounter = transactions.length + 1;

    // Create OHLC data for BTC/USD
    const now2 = new Date();
    const baseTime = now2.getTime() - (1000 * 60 * 60); // Start 1 hour ago
    const ohlcData: OHLC[] = [
      {
        id: 1,
        instrumentId: 1,
        timestamp: new Date(baseTime).toISOString(),
        timeframe: '1m',
        open: 28632.44,
        high: 28638.87,
        low: 28628.69,
        close: 28634.36,
        volume: 100,
      },
      {
        id: 2,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60).toISOString(),
        timeframe: '1m',
        open: 28634.36,
        high: 28640.12,
        low: 28630.25,
        close: 28636.54,
        volume: 85,
      },
      {
        id: 3,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 2).toISOString(),
        timeframe: '1m',
        open: 28636.54,
        high: 28642.33,
        low: 28632.18,
        close: 28638.72,
        volume: 92,
      },
      {
        id: 4,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 3).toISOString(),
        timeframe: '1m',
        open: 28638.72,
        high: 28644.56,
        low: 28634.12,
        close: 28640.91,
        volume: 78,
      },
      {
        id: 5,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 4).toISOString(),
        timeframe: '1m',
        open: 28640.91,
        high: 28646.78,
        low: 28636.05,
        close: 28643.09,
        volume: 110,
      },
      {
        id: 6,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 5).toISOString(),
        timeframe: '1m',
        open: 28643.09,
        high: 28649.01,
        low: 28637.99,
        close: 28645.28,
        volume: 95,
      },
      {
        id: 7,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 6).toISOString(),
        timeframe: '1m',
        open: 28645.28,
        high: 28651.23,
        low: 28639.92,
        close: 28647.46,
        volume: 88,
      },
      {
        id: 8,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 7).toISOString(),
        timeframe: '1m',
        open: 28647.46,
        high: 28653.46,
        low: 28641.86,
        close: 28649.65,
        volume: 102,
      },
      {
        id: 9,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 8).toISOString(),
        timeframe: '1m',
        open: 28649.65,
        high: 28655.68,
        low: 28643.79,
        close: 28651.83,
        volume: 115,
      },
      {
        id: 10,
        instrumentId: 1,
        timestamp: new Date(baseTime + 1000 * 60 * 9).toISOString(),
        timeframe: '1m',
        open: 28651.83,
        high: 28657.91,
        low: 28645.73,
        close: 28654.02,
        volume: 98,
      },
    ];

    ohlcData.forEach(data => {
      this.ohlcData.set(data.id, data);
    });
    this.ohlcIdCounter = ohlcData.length + 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Portfolio methods
  async getPortfolio(id: number): Promise<Portfolio | undefined> {
    return this.portfolios.get(id);
  }

  async getPortfolioByUserId(userId: number): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.userId === userId,
    );
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = this.portfolioIdCounter++;
    const portfolio: Portfolio = { ...insertPortfolio, id };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolio(id: number, updates: Partial<Portfolio>): Promise<Portfolio | undefined> {
    const portfolio = this.portfolios.get(id);
    if (!portfolio) return undefined;

    const updatedPortfolio = { ...portfolio, ...updates };
    this.portfolios.set(id, updatedPortfolio);
    return updatedPortfolio;
  }

  // Instrument methods
  async getInstrument(id: number): Promise<Instrument | undefined> {
    return this.instruments.get(id);
  }

  async getInstrumentBySymbol(symbol: string, exchange: string): Promise<Instrument | undefined> {
    return Array.from(this.instruments.values()).find(
      (instrument) => instrument.symbol === symbol && instrument.exchange === exchange,
    );
  }

  async getAllInstruments(): Promise<Instrument[]> {
    return Array.from(this.instruments.values());
  }

  async createInstrument(insertInstrument: InsertInstrument): Promise<Instrument> {
    const id = this.instrumentIdCounter++;
    const instrument: Instrument = { ...insertInstrument, id };
    this.instruments.set(id, instrument);
    return instrument;
  }

  // Watchlist methods
  async getWatchlistItem(id: number): Promise<WatchlistItem | undefined> {
    return this.watchlist.get(id);
  }

  async getWatchlistByUserId(userId: number): Promise<WatchlistItem[]> {
    return Array.from(this.watchlist.values()).filter(
      (item) => item.userId === userId,
    );
  }

  async createWatchlistItem(insertItem: InsertWatchlistItem): Promise<WatchlistItem> {
    const id = this.watchlistIdCounter++;
    const item: WatchlistItem = { ...insertItem, id };
    this.watchlist.set(id, item);
    return item;
  }

  async deleteWatchlistItem(id: number): Promise<boolean> {
    return this.watchlist.delete(id);
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date().toISOString();
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { 
      ...order, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }

  async deleteAllOrdersByUserId(userId: number): Promise<boolean> {
    const userOrders = Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
    
    userOrders.forEach(order => {
      this.orders.delete(order.id);
    });
    
    return true;
  }

  // Position methods
  async getPosition(id: number): Promise<Position | undefined> {
    return this.positions.get(id);
  }

  async getPositionsByUserId(userId: number): Promise<Position[]> {
    return Array.from(this.positions.values()).filter(
      (position) => position.userId === userId,
    );
  }

  async createPosition(insertPosition: InsertPosition): Promise<Position> {
    const id = this.positionIdCounter++;
    const position: Position = { 
      ...insertPosition, 
      id, 
      updatedAt: new Date().toISOString() 
    };
    this.positions.set(id, position);
    return position;
  }

  async updatePosition(id: number, updates: Partial<Position>): Promise<Position | undefined> {
    const position = this.positions.get(id);
    if (!position) return undefined;

    const updatedPosition = { 
      ...position, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    this.positions.set(id, updatedPosition);
    return updatedPosition;
  }

  async deletePosition(id: number): Promise<boolean> {
    return this.positions.delete(id);
  }

  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // OHLC Data methods
  async getOHLCData(
    instrumentId: number, 
    timeframe: string, 
    start: Date, 
    end: Date
  ): Promise<OHLC[]> {
    return Array.from(this.ohlcData.values()).filter(
      (data) => 
        data.instrumentId === instrumentId && 
        data.timeframe === timeframe &&
        new Date(data.timestamp) >= start &&
        new Date(data.timestamp) <= end
    );
  }

  async createOHLCData(insertData: InsertOHLC): Promise<OHLC> {
    const id = this.ohlcIdCounter++;
    const data: OHLC = { ...insertData, id };
    this.ohlcData.set(id, data);
    return data;
  }
}

export const storage = new MemStorage();
