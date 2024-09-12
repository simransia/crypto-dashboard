import React from "react";

const Analysis = ({ priceChange24h }: { priceChange24h: number }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Market Analysis</h2>
      <p className="mt-4">
        Based on current market trends and price movement, Bitcoin has shown{" "}
        <span className="text-blue-600">
          {priceChange24h >= 0 ? "bullish" : "bearish"}
        </span>{" "}
        sentiment in the past 24 hours.
      </p>
    </div>
  );
};

export default Analysis;
