import React, { useState } from "react";
import { Order } from "@/lib/types";
import { X, Edit, Menu } from "lucide-react";
import closeImg from "../../../public/close.png";
import drawImg from "../../../public/draw.png";

interface OrderBookPanelProps {
  orders: Order[];
  onCancelOrder: (id: number) => void;
  onCancelAll: () => void;
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({
  orders,
  onCancelOrder,
  onCancelAll,
}) => {
  const [buy, setBuy] = useState<string>("Buy");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [timeInForce, setTimeInForce] = useState<string>("GTC");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission - in a real app this would call an API
    console.log("Order submitted", {
      buy,
      quantity,
      price,
      portfolio,
      account,
      timeInForce,
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Orders Header */}
      <div className="bg-card border-t border-border p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="tool-button text-[#788699]" title="Menu">
            <Menu className="h-4 w-10" />
          </button>
          <span className="text-[#788699]">ORDERS</span>
          <button className="bg-[#0270fd] text-white rounded-full flex justify-center items-center text-xs w-4 h-4">
            <span className="">{orders.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-0.5 text-xs bg-accent rounded hover:bg-muted font-bold">
            Advanced Order
          </button>

          <button className="px-2 py-0.5 text-xs bg-accent rounded hover:bg-muted font-bold">
            RFQ / RFS
          </button>
          <button
            onClick={onCancelAll}
            className="px-2 py-0.5 text-xs text-white bg-red-600 rounded hover:bg-red-700 font-bold"
          >
            Cancel All
          </button>
          <button
            type="button"
            className="ml-2"
            data-tooltip="Bar's style"
            aria-label="Bar's style"
            aria-haspopup="menu"
          >
            <div className="arrow-merBkM5y">
              <div className="arrowWrap-merBkM5y">
                <span role="img" className="icon-WB2y0EnP" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 8"
                    width="16"
                    height="8"
                  >
                    <path
                      fill="currentColor"
                      d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Order Form */}
      <div className="bg-card p-2 border-t border-border">
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-12 space-x-1 mb-2">
            <div className="col-span-6">Security</div>
            <div className="col-span-2">
              <select
                value={buy}
                onChange={(e) => setBuy(e.target.value)}
                className="bg-secondary text-xs px-2 py-1 rounded border border-border flex-1"
              >
                <option>Buy</option>
                <option>Sell</option>
              </select>
            </div>
            <div className="col-span-2">
              <div>
                {/* <input
                  type="text"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-secondary text-xs px-2 py-1 rounded border border-border w-full"
                /> */}
                <select
                  value={buy}
                  onChange={(e) => setBuy(e.target.value)}
                  className="bg-secondary text-xs px-2 py-1 rounded border border-border flex-1"
                >
                  <option>Orders</option>
                  <option>Orders2</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <button
                  type="submit"
                  className={`text-white text-xs px-4 py-1 rounded w-full ${
                    buy === "Buy"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 space-x-7">
            <div className="col-span-1">
              <select className="bg-secondary text-xs pr-2 py-1 rounded border border-border w-full">
                <option value="Quantity">Quantity</option>
                <option value="Quantity">Quantity</option>
                <option value="Quantity">Quantity</option>
                <option value="Quantity">Quantity</option>
              </select>
            </div>
            <div className="col-span-1">
              <select className="bg-secondary text-xs pr-2 py-1 rounded border border-border w-full">
                <option value="Portfolio">Portfolio</option>
              </select>
            </div>
            <div className="col-span-1">
              <select className="bg-secondary text-xs pr-2 py-1 rounded border border-border w-full">
                <option value="Account">Account</option>
              </select>
            </div>
            <div className="col-span-1">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-[5px] bg-[#f75d5d]"></div>
                <span>Margin</span>
              </div>
            </div>
            <div className="col-span-1">
              <select className="bg-secondary text-xs pr-2 py-1 rounded border border-border w-full">
                <option value="Tif">TIF</option>
              </select>
            </div>
            <div className="col-span-1">
              <div className="flex items-center gap-1 ">
                <div className="w-4 h-4 rounded-[5px] bg-[#d0d4db] border"></div>
                <span>PO</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Orders Table */}
      <div className="bg-card max-h-[400px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="table-header text-left">
              <th className="table-cell">Obj...</th>
              <th className="table-cell">Int Id</th>
              <th className="table-cell">po...</th>
              <th className="table-cell">sy...</th>
              <th className="table-cell">s...</th>
              <th className="table-cell">Q...</th>
              <th className="table-cell">Tif</th>
              <th className="table-cell">Li...</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Filled...</th>
              <th className="table-cell">Pr...</th>
              <th className="table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-secondary"
              >
                <td className="table-cell">
                  {order.exchange.substring(0, 6)}...
                </td>
                <td className="table-cell">
                  {order.account.substring(0, 5)}...
                </td>
                <td className="table-cell">
                  {order.portfolio.substring(0, 4)}...
                </td>
                <td className="table-cell">
                  {order.symbol.substring(0, 3)}...
                </td>
                <td
                  className={`table-cell font-semibold ${
                    order.side === "BUY" ? "positive" : "negative"
                  }`}
                >
                  {order.side}
                </td>
                <td className="table-cell">{order.quantity}</td>
                <td className="table-cell">{order.timeInForce}</td>
                <td className="table-cell">
                  {order.price ? order.price.toFixed(2) : "-"}
                </td>
                <td className="table-cell">
                  <button
                    type="button"
                    className={`${
                      order.status === "EXECUTING" && "bg-[#478674] text-white"
                    }
                     ${order.status === "PARTIAL" && "bg-[#3a749c] text-white"}
                     ${
                       order.status === "SUBMITTED" && "bg-[#3a749c] text-white"
                     }
                    
                    p-2 rounded-[2px] w-[100px]`}
                  >
                    {order.status}
                  </button>
                </td>
                <td className="table-cell text-right">{order.filledQuantity}</td>
                <td className="table-cell">
                  <div
                  
                    className={`${
                      order.status === "EXECUTING" && "bg-[#478674] text-white"
                    }
                     ${order.status === "PARTIAL" && "bg-[#3a749c] text-white"}
                     ${
                       order.status === "SUBMITTED" && "bg-[#3a749c] text-white"
                     } w-${Math.min(
                      16,
                      Math.floor((order.filledQuantity / order.quantity) * 16)
                    )} ${
                      order.side === "BUY" ? "bg-positive" : "bg-neutral-600"
                    } h-1`}
                  ></div>
                </td>
                <td className="table-cell space-x-1">
                  <div className="flex gap-2">
                    <button type="button" className="h-3 w-3">
                      <img
                        src={closeImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button type="button" className="h-3 w-3">
                      <img
                        src={drawImg}
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

export default OrderBookPanel;
