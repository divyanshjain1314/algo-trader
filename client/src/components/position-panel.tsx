import React from "react";
import { Position } from "@/lib/types";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import lineChart from "../../../public/line-chart.png";
import plusImg from "../../../public/square.png";
import minusImg from "../../../public/minus-button.png";
import closeImg from "../../../public/close.png";
import nextImg from "../../../public/next.png";

interface PositionPanelProps {
  positions: Position[];
  onClosePosition: (id: number) => void;
}

const PositionPanel: React.FC<PositionPanelProps> = ({
  positions,
  onClosePosition,
}) => {
  console.log("positions", positions);
  return (
    <div className="flex-1 flex flex-col border-b border-border mb-3">
      <div className="panel-header">
        <div className="flex items-center space-x-2">
          <button className="tool-button text-[#788699]" title="Menu">
            <Menu className="h-4 w-10" />
          </button>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-[#788699]">POSITION</span>
            <button className="bg-[#0270fd] text-white rounded-full flex justify-center items-center text-xs w-4 h-4">
              {positions.length}
            </button>
          </div>
          <div className="ps-10 flex justify-center items-center space-x-2">
            <span className="text-[#788699]">CASH BALANCE</span>
            <button className="bg-[#0270fd] text-white rounded-full flex justify-center items-center text-xs w-4 h-4">
              {positions.length}
            </button>
          </div>
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
            <th className="ps-2 font-[400] text-[#788699] text-left py-1">
              T...
            </th>
            <th className="font-[400] text-[#788699] text-left py-1">Exc...</th>
            <th className="font-[400] text-[#788699] text-left py-1">S...</th>
            <th className="font-[400] text-[#788699] text-left py-1">Q...</th>
            <th className="font-[400] text-[#788699] text-left py-1">Av...</th>
            <th className="font-[400] text-[#788699] text-left py-1">M...</th>
            <th className="font-[400] text-[#788699] text-left py-1">Mar...</th>
            <th className="font-[400] text-[#788699] text-left py-1">Cost</th>
            <th className="font-[400] text-[#788699] text-left py-1">Unr...</th>
            <th className="font-[400] text-[#788699] text-left py-1">Re...</th>
            <th className="font-[400] text-[#788699] text-left py-1"></th>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id}>
                <td className="ps-2 table-cell">{position.account}</td>
                <td className="table-cell">
                  {position.exchange.length > 5
                    ? position.exchange.slice(0, 5) + "..."
                    : position.exchange}
                </td>
                <td className="table-cell">{position.symbol}</td>
                <td
                  className={`table-cell ${
                    position.quantity >= 0 ? "positive" : "negative"
                  }`}
                >
                  {position.quantity}
                </td>
                <td
                  className={`table-cell ${
                    String(position.averagePrice) !== "-"
                      ? String(position.averagePrice).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.averagePrice}
                </td>
                <td
                  className={`table-cell ${
                    String(position.marketPrice) !== "-"
                      ? String(position.marketPrice).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.marketPrice}
                </td>
                <td
                  className={`table-cell ${
                    String(position.marketValue) !== "-"
                      ? String(position.marketValue).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.marketValue}
                </td>
                <td
                  className={`table-cell ${
                    String(position.cost) !== "-"
                      ? String(position.cost).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.cost}
                </td>
                <td
                  className={`table-cell ${
                    String(position.unrealizedPnL) !== "-"
                      ? String(position.unrealizedPnL).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.unrealizedPnL}
                </td>
                <td
                  className={`table-cell ${
                    String(position.realizedPnL) !== "-"
                      ? String(position.realizedPnL).startsWith("-")
                        ? "negative"
                        : "positive"
                      : ""
                  }`}
                >
                  {position.realizedPnL}
                </td>
                <td className="px-1">
                  <div className="flex justify-center items-center gap-3">
                    <button type="button" className="h-3 w-3.5">
                      <img
                        src={closeImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
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
                    <button type="button" className="h-4 w-4">
                      <img
                        src={nextImg}
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

export default PositionPanel;
