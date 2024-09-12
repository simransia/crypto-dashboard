import React, { useState } from "react";

import { Analysis, Chart, Settings, Statistics, Summary } from "./components";
import useCoinData from "./hooks/useCoinData";

// Define available tabs
const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

const ChartComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Chart");

  const { marketData, loading } = useCoinData();

  if (loading || !marketData) {
    return <div className="text-center">Loading...</div>;
  }

  const currentPrice = marketData.current_price.usd;

  const priceChange24h = marketData.price_change_percentage_24h;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Summary":
        return <Summary marketData={marketData} currentPrice={currentPrice} />;
      case "Chart":
        return <Chart />;
      case "Statistics":
        return (
          <Statistics marketData={marketData} priceChange24h={priceChange24h} />
        );
      case "Analysis":
        return <Analysis priceChange24h={priceChange24h} />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 font-sans text-gray-900">
      {/* Price Information */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold">${currentPrice.toFixed(2)} USD</h1>
        <p
          className={`text-xl mt-2 ${
            priceChange24h >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {priceChange24h >= 0 ? "+" : ""}
          {priceChange24h.toFixed(2)}% (24h)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 border-b border-gray-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab ? "font-bold border-b-2 border-black" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default ChartComponent;
