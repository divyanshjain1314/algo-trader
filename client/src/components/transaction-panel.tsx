import React from 'react';
import { Transaction } from '@/lib/types';
import { Plus, ChevronDown, X } from 'lucide-react';

interface TransactionPanelProps {
  transactions: Transaction[];
}

const TransactionPanel: React.FC<TransactionPanelProps> = ({ transactions }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="panel-header">
        <div className="flex items-center space-x-2">
          <span>TRANSACTIONS</span>
          <span className="bg-blue-600 rounded-full px-1 text-xs">{transactions.length}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-5 h-5 flex items-center justify-center text-xs">
            <Plus className="h-3 w-3" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center text-xs">
            <ChevronDown className="h-3 w-3" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center text-xs">
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex text-xs bg-secondary border-b border-border">
        <div className="px-2 py-1">Exchange Name</div>
        <div className="px-2 py-1">Date Time</div>
        <div className="px-2 py-1">Symbol</div>
        <div className="px-2 py-1">Type</div>
        <div className="px-2 py-1">Quantity</div>
        <div className="px-2 py-1">Portfolio</div>
        <div className="px-2 py-1">Price</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {transactions.map((transaction) => {
              const date = new Date(transaction.timestamp);
              const timeStr = date.toISOString().split('T')[1].substring(0, 8);
              const isPositive = transaction.side === 'BUY';

              return (
                <tr key={transaction.id} className="hover:bg-secondary border-b border-border text-xs">
                  <td className="table-cell">{transaction.exchange}</td>
                  <td className="table-cell">{timeStr} UTC</td>
                  <td className="table-cell">{transaction.symbol}</td>
                  <td className={`table-cell ${isPositive ? 'positive' : 'negative'}`}>
                    {transaction.side}
                  </td>
                  <td className="table-cell">{isPositive ? transaction.quantity : -transaction.quantity}</td>
                  <td className="table-cell">{transaction.account}</td>
                  <td className={`table-cell ${transaction.side === 'BUY' ? 'positive' : ''}`}>
                    {transaction.symbol.includes('BTC') ? 'BTC' : '$'} {transaction.price.toFixed(transaction.price < 1 ? 5 : 2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionPanel;
