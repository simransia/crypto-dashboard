import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Analysis, Chart, Settings, Statistics, Summary } from "./components";
import { useCoinData, useChartData } from "./hooks";
import { TABS } from "./constants/tabs";

const ChartComponent: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>("1w");

  const { marketData, loading: CoindataLoading } = useCoinData();

  const { data: chartData, loading: ChartDataLoading } = useChartData({
    selectedRange,
  });

  const currentPrice = marketData ? marketData?.current_price.usd : 0;

  const priceChange24h = marketData
    ? marketData?.price_change_percentage_24h
    : 0;

  // const currentPrice=chartData[chartData.length - 1].value;
  const priceChange =
    chartData.length > 0
      ? chartData[chartData.length - 1].value - chartData[0].value
      : 0;

  if (
    CoindataLoading ||
    ChartDataLoading ||
    !marketData ||
    chartData.length === 0
  ) {
    return <div className="text-center">Loading...</div>;
  }

  console.log(chartData, "here");

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold">${currentPrice?.toFixed(2)} USD</h1>
        <p
          className={`text-xl mt-2 ${
            priceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {priceChange >= 0 ? "+" : "-"}
          {Math.abs(priceChange).toFixed(2)} (
          {((priceChange / currentPrice) * 100).toFixed(2)}%)
        </p>
      </div>

      <Tabs defaultValue="chart" className="w-1/2 mx-auto mt-6">
        <TabsList className="grid w-3/4 grid-cols-5 bg-transparent border-b rounded-none">
          {TABS.map((item, index) => (
            <TabsTrigger key={index} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="summary">
          <Summary marketData={marketData} currentPrice={currentPrice} />
        </TabsContent>
        <TabsContent value="chart">
          <Chart
            data={chartData}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            loading={ChartDataLoading}
          />
        </TabsContent>
        <TabsContent value="statistic">
          <Statistics marketData={marketData} priceChange24h={priceChange24h} />
        </TabsContent>
        <TabsContent value="analysis">
          <Analysis priceChange24h={priceChange24h} />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
    // <Fragment />
  );
};

export default ChartComponent;
