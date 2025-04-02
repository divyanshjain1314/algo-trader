import React from "react";
import { User, Portfolio } from "@/lib/types";
import ThemeSwitch from "./theme-switch";

interface HeaderProps {
  user: User;
  portfolio: Portfolio;
}

const Header: React.FC<HeaderProps> = ({ user, portfolio }) => {
  return (
    <header className="border-b border-border p-4">
      <div>
        <div className="grid grid-cols-9">
          <div className="col-span-2">
            <h1 className="text-5xl font-bold text-[#092057]">AlgoTrader</h1>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              Name
            </div>
            <div className="text-sm text-[#349687] font-[600] text-[12px]">{user.name}</div>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              Pan no.
            </div>
            <div className="text-sm text-[#349687] font-[600] text-[12px]">{user.panNumber}</div>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              MARKET VALUE
            </div>
            <div className="text-sm text-[#349687] font-[600] text-[12px]">
              ${portfolio.marketValue.toLocaleString()}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              POSITIONS
            </div>
            <div className="text-sm text-[#349687] font-[600] text-[12px]">{portfolio.positions}</div>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              Investment
            </div>
            <div className="text-sm text-[#349687] font-[600] text-[12px]">
              {portfolio.investment.toLocaleString()}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-[12px] text-[#373737] font-[600]">
              Profit
            </div>
            <div className="text-sm positive text-[#349687] font-[600] text-[12px]">
              +{portfolio.profit.toLocaleString()}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex justify-between">
              <div>
                <div className="text-[12px] text-[#373737] font-[600]">
                  PORTFOLIO
                </div>
                <div className="text-sm text-[#349687] font-[600] text-[12px]">{portfolio.type}</div>
              </div>
              <div className="">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
