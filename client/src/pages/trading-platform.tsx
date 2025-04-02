import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MOCK_USER,
  MOCK_PORTFOLIO,
  MOCK_OHLC_DATA,
  DEFAULT_TICKER,
} from "@/lib/constants";
import Header from "@/components/header";
import ChartPanel from "@/components/chart-panel";
import OrderBookPanel from "@/components/orderbook-panel";
import WatchlistPanel from "@/components/watchlist-panel";
import PositionPanel from "@/components/position-panel";
import TransactionPanel from "@/components/transaction-panel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

const TradingPlatform: React.FC = () => {
  // Fetch data from API
  const { data: user } = useQuery({
    queryKey: ["/api/user"],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      return MOCK_USER;
    },
  });

  const { data: portfolio } = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      return MOCK_PORTFOLIO;
    },
  });

  const { data: orders } = useQuery({
    queryKey: ["/api/orders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return await response.json();
    },
  });

  const { data: positions } = useQuery({
    queryKey: ["/api/positions"],
    queryFn: async () => {
      const response = await fetch("/api/positions");
      if (!response.ok) {
        throw new Error("Failed to fetch positions");
      }
      return await response.json();
    },
  });

  const { data: watchlist } = useQuery({
    queryKey: ["/api/watchlist"],
    queryFn: async () => {
      const response = await fetch("/api/watchlist");
      if (!response.ok) {
        throw new Error("Failed to fetch watchlist");
      }
      return await response.json();
    },
  });

  const { data: transactions } = useQuery({
    queryKey: ["/api/transactions"],
    queryFn: async () => {
      const response = await fetch("/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return await response.json();
    },
  });

  const { data: chartData } = useQuery({
    queryKey: ["/api/chart/BTCUSD/1m"],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      return MOCK_OHLC_DATA;
    },
  });

  // Handle canceling an order
  const handleCancelOrder = async (id: number) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      // Invalidate orders query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  // Handle canceling all orders
  const handleCancelAll = async () => {
    try {
      const response = await fetch("/api/orders/cancel-all", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel all orders");
      }

      // Invalidate orders query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    } catch (error) {
      console.error("Error canceling all orders:", error);
    }
  };

  // Handle removing an item from watchlist
  const handleRemoveWatchlistItem = async (id: number) => {
    try {
      const response = await fetch(`/api/watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove watchlist item");
      }

      // Invalidate watchlist query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/watchlist"] });
    } catch (error) {
      console.error("Error removing watchlist item:", error);
    }
  };

  // Handle closing a position
  const handleClosePosition = async (id: number) => {
    try {
      const response = await fetch(`/api/positions/${id}/close`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to close position");
      }

      // Invalidate positions query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/positions"] });
    } catch (error) {
      console.error("Error closing position:", error);
    }
  };

  // Loading state - show minimal loading UI
  if (!user || !portfolio || !chartData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-foreground">Loading AlgoTrader...</div>
      </div>
    );
  }

  console.log("chartData", chartData);

  return (
    <div className="flex flex-col text-sm">
      <Header user={user} portfolio={portfolio} />

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-6">
          <Tabs
            defaultValue="chart"
            className="flex flex-col border-r border-border w-4/7 overflow-hidden"
          >
            <TabsList className="flex rounded-none gap-20">
              <button className="tool-button" title="Menu">
                <Menu className="h-4 w-10" />
              </button>
              <TabsTrigger
                value="chart"
                className="tab-button data-[state=active]:tab-button-active data-[state=active]:bg-none"
              >
                CHART
              </TabsTrigger>
              <TabsTrigger
                value="orderbook"
                className="tab-button data-[state=active]:tab-button-active"
              >
                ORDERBOOK
              </TabsTrigger>
              <div className="flex-grow"></div>
              <button className="px-2 text-2xl font-[600]">&times;</button>
            </TabsList>

            <div className="p-0 m-0  h-auto border border-[#ced1d5] rounded-[2px]">
              <ChartPanel
                symbol={DEFAULT_TICKER}
                data={chartData}
                intervals={[
                  { value: "1m", label: "1m" },
                  { value: "30m", label: "30m" },
                  { value: "1h", label: "1h" },
                ]}
              />
            </div>

            <div className="flex-1 flex flex-col p-0 m-0">
              <OrderBookPanel
                orders={orders || []}
                onCancelOrder={handleCancelOrder}
                onCancelAll={handleCancelAll}
              />
            </div>
          </Tabs>
        </div>
        <div className="col-span-6">
          <div className="flex flex-col bg-background overflow-hidden">
            <WatchlistPanel
              watchlist={watchlist || []}
              onRemoveItem={handleRemoveWatchlistItem}
            />

            <PositionPanel
              positions={positions || []}
              onClosePosition={handleClosePosition}
            />

            <TransactionPanel transactions={transactions || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPlatform;
