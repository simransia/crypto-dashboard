import { useState, useEffect } from "react";

export interface MarketData {
  current_price: { [currency: string]: number };
  market_cap: { [currency: string]: number };
  high_24h: { [currency: string]: number };
  low_24h: { [currency: string]: number };
  total_volume: { [currency: string]: number };
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath: { [currency: string]: number };
  atl: { [currency: string]: number };
}

const useCoinData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin`
        );
        const result = await response.json();
        setMarketData(result.market_data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchCoinData();
    setLoading(false);
  }, []);

  return { marketData, loading };
};

export default useCoinData;
