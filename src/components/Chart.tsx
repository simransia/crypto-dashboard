import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";
import { ChartData } from "../hooks/useChartData";
import ChartHeader from "./ChartHeader";
import { useEffect, useRef } from "react";

type Props = {
  loading: boolean;
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
  selectedRange: string;
  data: ChartData[];
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  annotationPlugin // Register annotation plugin
);

const Chart = ({ setSelectedRange, selectedRange, data }: Props) => {
  const chartRef = useRef(null);

  // Extract dates and values from the data
  const dates = data.map((item) => item.date);
  const values = data.map((item) => item.value);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = (chart as any).ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(23, 11, 243, 0.3)");
      gradient.addColorStop(1, "rgba(39, 32, 169, 0)");

      (chart as any).data.datasets[0].backgroundColor = gradient;
      (chart as any).update();
    }
  }, [data]);

  const lastIndex = dates.length - 1;
  const middleIndex = Math.floor(lastIndex / 2); // Calculate middle point for vertical line

  // const average = values.reduce((a, b) => a + b, 0) / values.length;

  const average = (ctx: any) => {
    const values = ctx.chart.data.datasets[0].data;
    return Math.round(
      values.reduce((a: any, b: any) => a + b, 0) / values.length
    );
  };

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Data",
        data: values,
        fill: true,
        backgroundColor: "rgba(34, 25, 216, 0.3)",
        borderColor: "rgba(23, 11, 243, 0.8)",
        tension: 0, // Smooth curve
        pointRadius: 0, // Hide data points
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    layout: {
      padding: {
        right: 100,
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          maxTicksLimit: 4,
          display: false,
        },
        grid: {
          drawTicks: false,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true,
      },
      annotation: {
        clip: false,
        annotations: {
          annotation: {
            type: "line",
            borderColor: "gray",
            borderDash: [5, 5],
            borderDashOffset: 0,
            borderWidth: 0.8,
            label: {
              display: true,
              content: (ctx: any) => `$${average(ctx).toFixed(0)}`,
              position: "end",
              xAdjust: 70,
            },
            scaleID: "y",
            value: (ctx: any) => average(ctx),
          },
          lastValueAnnotation: {
            type: "line",
            borderColor: "transparent",
            borderDash: [5, 5],
            borderDashOffset: 0,
            borderWidth: 0.8,
            label: {
              display: true,
              content: (ctx: any) => `$${values[values.length - 1].toFixed(0)}`,
              position: "end",
              xAdjust: 70, // Adjust if needed
              backgroundColor: "#3a31de",
            },
            scaleID: "y",
            value: (ctx: any) => values[values.length - 1],
          },
        },
      },
    },
  };

  return (
    <div className="w-full mt-8">
      <ChartHeader
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <div style={{ height: "300px", width: "100%" }}>
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;
