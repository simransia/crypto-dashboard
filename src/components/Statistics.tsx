import { MarketData } from "../hooks/useCoinData";

type StatisticsProps = {
  marketData: MarketData;
  priceChange24h: number;
};

const Statistics = ({ marketData, priceChange24h }: StatisticsProps) => {
  const statisticsItems = [
    {
      label: "Price Change (24h)",
      value: `${priceChange24h.toFixed(2)}%`,
    },
    {
      label: "Circulating Supply",
      value: marketData.circulating_supply.toLocaleString(),
    },
    {
      label: "Total Supply",
      value: marketData.total_supply?.toLocaleString() ?? "N/A",
    },
    {
      label: "All-Time High",
      value: `$${marketData.ath.usd.toFixed(2)}`,
    },
    {
      label: "All-Time Low",
      value: `$${marketData.atl.usd.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Statistics</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {statisticsItems.map(({ label, value }) => (
          <li key={label}>
            {label}: <span className="text-blue-600">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
