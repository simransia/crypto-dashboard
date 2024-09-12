import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TIME_RANGES } from "../constants/timeRanges";
import useChartData from "../hooks/useChartData";

const Chart = () => {
  const [selectedRange, setSelectedRange] = useState<string>("1w");

  const { data, loading } = useChartData({ selectedRange });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-full mt-8">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-6">
        {Object.keys(TIME_RANGES).map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`px-4 py-2 ${
              selectedRange === range
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
