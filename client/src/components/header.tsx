import React from 'react';
import { User, Portfolio } from '@/lib/types';

interface HeaderProps {
  user: User;
  portfolio: Portfolio;
}

const Header: React.FC<HeaderProps> = ({ user, portfolio }) => {
  return (
    <header className="bg-secondary border-b border-border py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">AlgoTrader</h1>
        <div className="ml-6 flex items-center space-x-2">
          <div>
            <div className="text-xs text-muted-foreground">Name</div>
            <div className="text-sm text-foreground">{user.name}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Pan no.</div>
            <div className="text-sm text-primary">{user.panNumber}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-xs text-muted-foreground">MARKET VALUE</div>
          <div className="text-sm text-foreground">${portfolio.marketValue.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">POSITIONS</div>
          <div className="text-sm text-foreground">{portfolio.positions}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Investment</div>
          <div className="text-sm text-foreground">{portfolio.investment.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Profit</div>
          <div className="text-sm positive">+{portfolio.profit.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">PORTFOLIO</div>
          <div className="text-sm text-foreground">{portfolio.type}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
