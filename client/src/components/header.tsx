import React from 'react';
import { User, Portfolio } from '@/lib/types';
import ThemeSwitch from './theme-switch';

interface HeaderProps {
  user: User;
  portfolio: Portfolio;
}

const Header: React.FC<HeaderProps> = ({ user, portfolio }) => {
  return (
    <header className="bg-secondary border-b border-border py-2 px-4 flex items-center">
      <div className="flex items-center space-x-4 gap-4 pr-10">
        <h1 className="text-3xl font-bold text-foreground">AlgoTrader</h1>
        <div className="ml-6 flex items-center space-x-2 gap-4">
          <div className='pr-10'>
            <div className="text-xs text-muted-foreground">Name</div>
            <div className="text-sm text-foreground">{user.name}</div>
          </div>
          <div className='pr-10'>
            <div className="text-xs text-muted-foreground">Pan no.</div>
            <div className="text-sm text-primary">{user.panNumber}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 gap-4">
        <div className='pr-10'>
          <div className="text-xs text-muted-foreground">MARKET VALUE</div>
          <div className="text-sm text-foreground">${portfolio.marketValue.toLocaleString()}</div>
        </div>
        <div className='pr-10'>
          <div className="text-xs text-muted-foreground">POSITIONS</div>
          <div className="text-sm text-foreground">{portfolio.positions}</div>
        </div>
        <div className='pr-10'>
          <div className="text-xs text-muted-foreground">Investment</div>
          <div className="text-sm text-foreground">{portfolio.investment.toLocaleString()}</div>
        </div>
        <div className='pr-10'>
          <div className="text-xs text-muted-foreground">Profit</div>
          <div className="text-sm positive">+{portfolio.profit.toLocaleString()}</div>
        </div>
        <div className='pr-10'>
          <div className="text-xs text-muted-foreground">PORTFOLIO</div>
          <div className="text-sm text-foreground">{portfolio.type}</div>
        </div>
        <div className="ml-4">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
