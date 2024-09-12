import { MarketData } from "../hooks/useCoinData";

type SummaryProps = {
  marketData: MarketData;
  currentPrice: number;
};

const Summary = ({ marketData, currentPrice }: SummaryProps) => {
  const high24h = marketData.high_24h.usd;
  const low24h = marketData.low_24h.usd;
  const marketCap = marketData.market_cap.usd;
  const volume = marketData.total_volume.usd;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Market Summary</h2>
      <ul className="mt-4">
        <li>Current Price: ${currentPrice.toFixed(2)}</li>
        <li>24h High: ${high24h.toFixed(2)}</li>
        <li>24h Low: ${low24h.toFixed(2)}</li>
        <li>Market Cap: ${marketCap.toLocaleString()}</li>
        <li>Trading Volume: ${volume.toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default Summary;
