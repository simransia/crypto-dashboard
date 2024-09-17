import { useEffect, useState, useCallback } from "react";
import { TIME_RANGES } from "../constants/timeRanges";

export interface ChartData {
  date: string;
  value: number;
}

interface UseChartDataProps {
  selectedRange: string;
}

export const useChartData = ({ selectedRange }: UseChartDataProps) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [volumeData, setVolumeData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${TIME_RANGES[selectedRange]}`
      );

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After") || "unknown";
        throw new Error(
          `Rate limit exceeded. Please try again in ${retryAfter} seconds.`
        );
      }

      if (!response.ok) {
        const result = await response.json();
        const errorMessage =
          result?.error?.status?.error_message || "An unknown error occurred.";
        throw new Error(errorMessage);
      }

      const result = await response.json();

      const formattedVolumeData = result.total_volumes.map(
        (volume: [number, number]): ChartData => ({
          date: new Date(volume[0]).toLocaleDateString(),
          value: volume[1],
        })
      );

      const formattedChartData = result.prices.map(
        (price: [number, number]): ChartData => ({
          date: new Date(price[0]).toLocaleDateString(),
          value: price[1],
        })
      );

      setVolumeData(formattedVolumeData);
      setData(formattedChartData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setError(errorMessage);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }, [selectedRange]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return { data, volumeData, loading, error, open, setOpen };
};
