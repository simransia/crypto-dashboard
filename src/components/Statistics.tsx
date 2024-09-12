import { MarketData } from "../hooks/useCoinData";

type StatisticsProps = {
  marketData: MarketData;
  priceChange24h: number;
};

const Statistics = ({ marketData, priceChange24h }: StatisticsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Statistics</h2>
      <ul className="mt-4">
        <li>Price Change (24h): {priceChange24h.toFixed(2)}%</li>
        <li>
          Circulating Supply: {marketData.circulating_supply.toLocaleString()}
        </li>
        <li>
          Total Supply: {marketData.total_supply?.toLocaleString() || "N/A"}
        </li>
        <li>All-Time High: ${marketData.ath.usd.toFixed(2)}</li>
        <li>All-Time Low: ${marketData.atl.usd.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default Statistics;
