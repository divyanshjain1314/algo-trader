import React from "react";
import { WatchlistItem } from "@/lib/types";
import { Plus, ChevronDown, X, ArrowLeft, Menu } from "lucide-react";
import lineChart from "../../../public/line-chart.png";
import plusImg from "../../../public/square.png";
import minusImg from "../../../public/minus-button.png";
interface WatchlistPanelProps {
  watchlist: WatchlistItem[];
  onRemoveItem: (id: number) => void;
}

const WatchlistPanel: React.FC<WatchlistPanelProps> = ({
  watchlist,
  onRemoveItem,
}) => {
  return (
    <div className="flex-1 flex flex-col border-b border-border mb-2">
      <div className="panel-header  h-12">
        <div className="flex items-center space-x-2">
          <button className="tool-button text-[#788699]" title="Menu">
            <Menu className="h-4 w-10" />
          </button>
          <span className="text-[#788699]">WATCHLIST</span>
          <button className="bg-[#0270fd] text-white rounded-full flex justify-center items-center text-xs w-4 h-4">
            <span className="">{watchlist.length}</span>
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
          <thead className="">
            <th className="font-[400] ps-2 text-[#788699] text-left py-1 min-w-[80px]">
              Exchange...
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[80px]">
              Symbol
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[60px]">
              Account...
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]">
              Last
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]">
              Vol...
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]">
              Bid
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]">
              Ask
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]">
              Vol...
            </th>
            <th className="font-[400] text-[#788699] text-left py-1 min-w-[40px]"></th>
          </thead>
          <tbody>
            {watchlist.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-secondary border-b border-border text-xs"
              >
                <td className="table-cell">{item.exchange}</td>
                <td className="table-cell">{item.symbol}</td>
                <td className="table-cell">{item.account}</td>
                <td className="table-cell">
                  {item.last.toFixed(item.last < 1 ? 5 : 2)}
                </td>
                <td className="table-cell">{item.volume.toFixed(3)}</td>
                <td className="table-cell negative">
                  {item.bid.toFixed(item.bid < 1 ? 5 : 2)}
                </td>
                <td className="table-cell positive">
                  {item.ask.toFixed(item.ask < 1 ? 5 : 2)}
                </td>
                <td className="table-cell">{item.askVolume.toFixed(3)}</td>
                <td className="px-1">
                  <div className="flex justify-center items-center gap-3">
                    <button type="button" className="h-4 w-4">
                      <img
                        src={lineChart}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button type="button" className="h-4 w-4">
                      <img
                        src={plusImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button type="button" className="h-4 w-4">
                      <img
                        src={minusImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
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
