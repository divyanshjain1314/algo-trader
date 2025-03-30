import React from 'react';
import { Position } from '@/lib/types';
import { ArrowRight, ChevronDown, X } from 'lucide-react';

interface PositionPanelProps {
  positions: Position[];
  onClosePosition: (id: number) => void;
}

const PositionPanel: React.FC<PositionPanelProps> = ({ positions, onClosePosition }) => {
  return (
    <div className="flex-1 flex flex-col border-b border-border">
      <div className="panel-header">
        <div className="flex items-center space-x-2">
          <span>POSITION</span>
          <span className="bg-blue-600 rounded-full px-1 text-xs">{positions.length}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-5 h-5 flex items-center justify-center text-xs">
            <ArrowRight className="h-3 w-3" />
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
        <div className="px-2 py-1">T...</div>
        <div className="px-2 py-1">Exc...</div>
        <div className="px-2 py-1">S...</div>
        <div className="px-2 py-1">Q...</div>
        <div className="px-2 py-1">Av...</div>
        <div className="px-2 py-1">M...</div>
        <div className="px-2 py-1">Mar...</div>
        <div className="px-2 py-1">Cost</div>
        <div className="px-2 py-1">Unr...</div>
        <div className="px-2 py-1">Re...</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {positions.map((position) => (
              <tr key={position.id} className="hover:bg-secondary border-b border-border text-xs">
                <td className="table-cell">MAR...</td>
                <td className="table-cell">{position.exchange.substring(0, 5)}...</td>
                <td className="table-cell">{position.symbol}</td>
                <td className={`table-cell ${position.quantity >= 0 ? '' : 'negative'}`}>
                  {position.quantity.toFixed(1)}...
                </td>
                <td className="table-cell">{position.currency} {position.averagePrice ? position.averagePrice.toFixed(2) : ''}</td>
                <td className="table-cell">{position.marketPrice ? `${position.currency} ${position.marketPrice.toFixed(2)}` : ''}</td>
                <td className={`table-cell ${position.marketValue >= 0 ? '' : 'negative'}`}>
                  {position.marketValue ? `${position.currency} ${Math.abs(position.marketValue).toFixed(2)}...` : ''}
                </td>
                <td className="table-cell">
                  {position.cost ? `${position.currency} ${position.cost.toFixed(2)}...` : ''}
                </td>
                <td className={`table-cell ${position.unrealizedPnL >= 0 ? 'positive' : 'negative'}`}>
                  {position.unrealizedPnL ? `${position.unrealizedPnL >= 0 ? '' : '-'}${position.currency} ${Math.abs(position.unrealizedPnL).toFixed(2)}...` : ''}
                </td>
                <td className="table-cell"></td>
                <td className="px-1">
                  <button 
                    onClick={() => onClosePosition(position.id)}
                    className="w-4 h-4 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
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

export default PositionPanel;
