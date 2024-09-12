import { useEffect, useState } from "react";
import { TIME_RANGES } from "../constants/timeRanges";

export interface ChartData {
  date: string;
  value: number;
}

export const useChartData = ({ selectedRange }: { selectedRange: string }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${TIME_RANGES[selectedRange]}`
        );
        const result = await response.json();
        const chartData: ChartData[] = result.prices.map(
          (price: [number, number]) => ({
            date: new Date(price[0]).toLocaleDateString(),
            value: price[1],
          })
        );
        setData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchMarketData();
    setLoading(false);
  }, [selectedRange]);

  return { data, loading };
};
