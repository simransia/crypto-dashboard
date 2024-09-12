import { MarketData } from "../hooks/useCoinData";

type SummaryProps = {
  marketData: MarketData;
  currentPrice: number;
};

const Summary = ({ marketData, currentPrice }: SummaryProps) => {
  const summaryItems = [
    { label: "Current Price", value: currentPrice.toFixed(2) },
    {
      label: "24h High",
      value: marketData.high_24h.usd.toFixed(2),
    },
    {
      label: "24h Low",
      value: marketData.low_24h.usd.toFixed(2),
    },
    {
      label: "Market Cap",
      value: marketData.market_cap.usd.toLocaleString(),
    },
    {
      label: "Trading Volume",
      value: marketData.total_volume.usd.toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Market Summary</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {summaryItems.map(({ label, value }) => (
          <li key={label}>
            {label}: <span className="text-blue-600">${value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
