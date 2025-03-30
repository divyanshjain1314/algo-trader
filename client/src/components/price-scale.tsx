import React from 'react';

interface PriceScaleProps {
  min: number;
  max: number;
  tickCount?: number;
}

const PriceScale: React.FC<PriceScaleProps> = ({ 
  min, 
  max, 
  tickCount = 14 
}) => {
  const tickValues = [];
  const step = (max - min) / (tickCount - 1);
  
  for (let i = 0; i < tickCount; i++) {
    tickValues.push(max - i * step);
  }

  return (
    <div className="absolute right-0 top-0 bottom-0 w-14 bg-card border-l border-border px-1 py-1 flex flex-col justify-between text-xs text-muted-foreground">
      {tickValues.map((value, index) => (
        <div key={index}>{value.toFixed(2)}</div>
      ))}
    </div>
  );
};

export default PriceScale;
