import React, { useState } from 'react';
import { Order } from '@/lib/types';
import { X, Edit } from 'lucide-react';

interface OrderBookPanelProps {
  orders: Order[];
  onCancelOrder: (id: number) => void;
  onCancelAll: () => void;
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ 
  orders, 
  onCancelOrder, 
  onCancelAll 
}) => {
  const [buy, setBuy] = useState<string>('Buy');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [portfolio, setPortfolio] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [timeInForce, setTimeInForce] = useState<string>('GTC');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission - in a real app this would call an API
    console.log('Order submitted', { buy, quantity, price, portfolio, account, timeInForce });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Orders Header */}
      <div className="bg-card border-t border-border p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="text-xs font-semibold">ORDERS</div>
          <span className="bg-blue-600 rounded-full px-1 text-xs">{orders.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-0.5 text-xs bg-accent rounded hover:bg-muted">Advanced Order</button>
          <button className="px-2 py-0.5 text-xs bg-accent rounded hover:bg-muted">RFQ / RFS</button>
          <button 
            onClick={onCancelAll}
            className="px-2 py-0.5 text-xs bg-red-600 rounded hover:bg-red-700"
          >
            Cancel All
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card h-36 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="table-header text-left">
              <th className="table-cell">Security</th>
              <th className="table-cell">Quantity</th>
              <th className="table-cell">PortFol.</th>
              <th className="table-cell">Account</th>
              <th className="table-cell"></th>
              <th className="table-cell">Margin</th>
              <th className="table-cell">T/P</th>
              <th className="table-cell"></th>
              <th className="table-cell">S/L</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Filled</th>
              <th className="table-cell">Price</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-secondary">
                <td className="table-cell">{order.exchange.substring(0, 8)}...</td>
                <td className="table-cell">{order.account.substring(0, 6)}...</td>
                <td className="table-cell">{portfolio.substring(0, 7)}...</td>
                <td className="table-cell">{order.symbol.substring(0, 4)}...</td>
                <td className={`table-cell font-semibold ${order.side === 'BUY' ? 'positive' : 'negative'}`}>
                  {order.side}
                </td>
                <td className="table-cell">{order.quantity}</td>
                <td className="table-cell">{order.timeInForce}</td>
                <td className="table-cell">{order.price ? order.price.toFixed(2) : '-'}</td>
                <td className="table-cell">{order.stopLoss ? order.stopLoss.toFixed(2) : '-'}</td>
                <td className="table-cell">{order.status}</td>
                <td className="table-cell">{order.filledQuantity}</td>
                <td className="table-cell">
                  <div 
                    className={`w-${Math.min(16, Math.floor(order.filledQuantity / order.quantity * 16))} ${
                      order.side === 'BUY' ? 'bg-positive' : 'bg-neutral-600'
                    } h-1`}
                  ></div>
                </td>
                <td className="table-cell flex space-x-1">
                  <button 
                    onClick={() => onCancelOrder(order.id)}
                    className="w-4 h-4 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <button className="w-4 h-4 flex items-center justify-center">
                    <Edit className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Form */}
      <div className="bg-card p-2 border-t border-border">
        <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2">
          <div className="flex space-x-1">
            <select 
              value={buy} 
              onChange={(e) => setBuy(e.target.value)}
              className="bg-secondary text-xs px-2 py-1 rounded border border-border flex-1"
            >
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Quantity" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-secondary text-xs px-2 py-1 rounded border border-border w-full"
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-secondary text-xs px-2 py-1 rounded border border-border w-full"
            />
          </div>
          
          <div>
            <select 
              value={timeInForce} 
              onChange={(e) => setTimeInForce(e.target.value)}
              className="bg-secondary text-xs px-2 py-1 rounded border border-border w-full"
            >
              <option value="GTC">GTC</option>
              <option value="IOC">IOC</option>
              <option value="FOK">FOK</option>
              <option value="DAY">DAY</option>
            </select>
          </div>
          
          <div>
            <button 
              type="submit" 
              className={`text-xs px-4 py-1 rounded w-full ${
                buy === 'Buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderBookPanel;
