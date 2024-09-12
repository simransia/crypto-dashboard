import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Analysis,
  Chart,
  Settings,
  Statistics,
  Summary,
  Header,
} from "./components";
import { useCoinData, useChartData } from "./hooks";
import { TABS } from "./constants/tabs";
import ChartActions from "./components/ChartActions";

const ChartComponent: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>("1w");

  const [expand, setExpand] = useState(true);

  const { marketData, loading: CoindataLoading } = useCoinData();

  const {
    data: chartData,
    volumeData,
    loading: ChartDataLoading,
  } = useChartData({
    selectedRange,
  });

  const priceChange24h = marketData
    ? marketData?.price_change_percentage_24h
    : 0;

  const currentPrice = chartData[chartData.length - 1].value;
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

  return (
    <div className="p-5">
      <div
        className={`border pb-5 border-gray-100 shadow rounded-md ${
          expand ? "h-full" : "w-1/2 mx-auto min-w-max"
        }`}
      >
        <Header currentPrice={currentPrice} priceChange={priceChange} />
        <Tabs defaultValue="chart" className="w-full mx-auto mt-6">
          <TabsList className="grid w-[60%] grid-cols-5 bg-transparent border-b rounded-none">
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
            <ChartActions
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              expand={expand}
              setExpand={setExpand}
            />
            <Chart
              data={chartData}
              loading={ChartDataLoading}
              volumeData={volumeData}
            />
          </TabsContent>
          <TabsContent value="statistic">
            <Statistics
              marketData={marketData}
              priceChange24h={priceChange24h}
            />
          </TabsContent>
          <TabsContent value="analysis">
            <Analysis priceChange24h={priceChange24h} />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChartComponent;
