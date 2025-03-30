import React from 'react';
import { 
  Menu, MousePointer, Crosshair, MoveHorizontal,
  Smile, Pencil, Plus, Search
} from 'lucide-react';

interface TradingToolsProps {}

const TradingTools: React.FC<TradingToolsProps> = () => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-8 bg-card border-r border-border flex flex-col items-center py-2 space-y-3">
      <button className="tool-button" title="Menu">
        <Menu className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Cursor">
        <MousePointer className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Crosshair">
        <Crosshair className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Move">
        <MoveHorizontal className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Emoji">
        <Smile className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Draw">
        <Pencil className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Add Indicator">
        <Plus className="h-4 w-4" />
      </button>
      <button className="tool-button" title="Search">
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TradingTools;
