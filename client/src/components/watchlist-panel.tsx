import React from 'react';
import { WatchlistItem } from '@/lib/types';
import { Plus, ChevronDown, X, ArrowLeft } from 'lucide-react';

interface WatchlistPanelProps {
  watchlist: WatchlistItem[];
  onRemoveItem: (id: number) => void;
}

const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ watchlist, onRemoveItem }) => {
  return (
    <div className="flex-1 flex flex-col border-b border-border">
      <div className="panel-header">
        <div className="flex items-center space-x-2">
          <span>WATCHLIST</span>
          <span className="bg-blue-600 rounded-full px-1 text-xs">{watchlist.length}</span>
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
        <div className="px-2 py-1 min-w-[80px]">Exchange...</div>
        <div className="px-2 py-1 min-w-[80px]">Symbol</div>
        <div className="px-2 py-1 min-w-[60px]">Account...</div>
        <div className="px-2 py-1 min-w-[40px]">Last</div>
        <div className="px-2 py-1 min-w-[40px]">Vol...</div>
        <div className="px-2 py-1 min-w-[40px]">Bid</div>
        <div className="px-2 py-1 min-w-[40px]">Ask</div>
        <div className="px-2 py-1 min-w-[40px]">Vol...</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {watchlist.map((item) => (
              <tr key={item.id} className="hover:bg-secondary border-b border-border text-xs">
                <td className="table-cell">{item.exchange}</td>
                <td className="table-cell">{item.symbol}</td>
                <td className="table-cell">{item.account}</td>
                <td className="table-cell">{item.last.toFixed(item.last < 1 ? 5 : 2)}</td>
                <td className="table-cell">{item.volume.toFixed(3)}</td>
                <td className="table-cell negative">{item.bid.toFixed(item.bid < 1 ? 5 : 2)}</td>
                <td className="table-cell positive">{item.ask.toFixed(item.ask < 1 ? 5 : 2)}</td>
                <td className="table-cell">{item.askVolume.toFixed(3)}</td>
                <td className="px-1">
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="w-4 h-4 flex items-center justify-center"
                  >
                    <ArrowLeft className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchlistPanel;
