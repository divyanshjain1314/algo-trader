import React from "react";
import { Transaction } from "@/lib/types";
import { Plus, ChevronDown, X, Menu } from "lucide-react";

interface TransactionPanelProps {
  transactions: Transaction[];
}

const TransactionPanel: React.FC<TransactionPanelProps> = ({
  transactions,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="panel-header">
        <div className="flex items-center space-x-2">
          <button className="tool-button text-[#788699]" title="Menu">
            <Menu className="h-4 w-10" />
          </button>
          <span className="text-[#788699]">TRANSACTIONS</span>
          <button className="bg-[#0270fd] text-white rounded-full flex justify-center items-center text-xs w-4 h-4">
            <span className="">{transactions.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-5 h-5 flex items-center justify-center text-xs text-[#788699]">
            <Plus className="h-4 w-4 font-bold" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center text-xs text-[#788699]">
            <ChevronDown className="h-4 w-4 font-bold" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center text-xs text-[#788699]">
            <X className="h-4 w-4 font-bold" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <th className="ps-2 font-[400] text-[#788699] text-left py-1">
              Exchange Name
            </th>
            <th className="font-[400] text-[#788699] text-left py-1">
              Date Time
            </th>
            <th className="font-[400] text-[#788699] text-left py-1">Symbol</th>
            <th className="font-[400] text-[#788699] text-left py-1">Type</th>
            <th className="font-[400] text-[#788699] text-left py-1">
              Quantity
            </th>
            <th className="font-[400] text-[#788699] text-left py-1">
              Portfolio
            </th>
            <th className="font-[400] text-[#788699] text-left py-1">Price</th>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const date = new Date(transaction.timestamp);
              const timeStr = date.toISOString().split("T")[1].substring(0, 8);
              const isPositive = transaction.side === "BUY";

              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-secondary border-b border-border text-xs"
                >
                  <td className="table-cell">{transaction.exchange}</td>
                  <td className="table-cell">{timeStr} UTC</td>
                  <td className="table-cell">{transaction.symbol}</td>
                  <td
                    className={`table-cell ${
                      isPositive ? "positive" : "negative"
                    }`}
                  >
                    {transaction.side}
                  </td>
                  <td className="table-cell">
                    {isPositive ? transaction.quantity : -transaction.quantity}
                  </td>
                  <td className="table-cell">{transaction.account}</td>
                  <td
                    className={`table-cell ${
                      transaction.side === "BUY" ? "positive" : ""
                    }`}
                  >
                    {transaction.symbol.includes("BTC") ? "BTC" : "$"}{" "}
                    {transaction.price.toFixed(transaction.price < 1 ? 5 : 2)}
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
