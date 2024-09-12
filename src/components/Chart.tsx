import {
  Chart as ChartJS,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  BarElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "react-chartjs-2";
import { useEffect, useRef } from "react";

type DataItem = {
  date: string;
  value: number;
};

type VolumeDataItem = {
  value: number;
};

type Props = {
  loading: boolean;
  data: DataItem[];
  volumeData: VolumeDataItem[];
};

ChartJS.register(
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  BarElement,
  annotationPlugin
);

const ChartComponent = ({ data, volumeData }: Props) => {
  const chartRef = useRef<ChartJS<"line" | "bar">>(null);

  const dates = data.map((item) => item.date);
  const values = data.map((item) => item.value);
  const volumes = volumeData.map((item) => item.value);

  //adding gradient
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(23, 11, 243, 0.2)");
      gradient.addColorStop(1, "rgba(39, 32, 169, 0)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [data]);

  // Calculate average value for annotation
  const calculateAverage = () => {
    if (values.length === 0) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const chartData: ChartData<"line" | "bar", number[], string> = {
    labels: dates,
    datasets: [
      {
        label: "Data",
        data: values,
        fill: true,
        backgroundColor: "rgba(23, 11, 243, 0.2)",
        borderColor: "rgba(23, 11, 243, 0.8)",
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
        type: "line",
        yAxisID: "y",
      },
      {
        label: "Volume",
        data: volumes,
        type: "bar",
        backgroundColor: "rgba(189, 196, 201, 0.5)",
        borderColor: "#c1c6c9",
        borderWidth: 1,
        yAxisID: "y_volume",
        barPercentage: 0.6,
      },
    ],
  };

  const chartOptions: ChartOptions<"line" | "bar"> = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
      bar: {
        borderSkipped: "bottom",
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
        min: Math.min(...chartData.datasets?.[0]?.data) * 0.95,
        // max: Math.max(...chartData.datasets?.[0]?.data) * 1,
      },
      y1: {
        position: "right",
        ticks: {
          display: false,
          maxTicksLimit: 0,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y_volume: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: Math.max(...chartData.datasets[1].data) * 8,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      annotation: {
        clip: false,
        annotations: {
          averageAnnotation: {
            type: "line",
            borderColor: "gray",
            borderDash: [5, 5],
            borderDashOffset: 0,
            borderWidth: 0.8,
            label: {
              display: true,
              content: (ctx: any) => `${calculateAverage().toFixed(2)}`,
              position: "end",
              xAdjust: 95,
              padding: {
                x: 14,
                y: 4,
              },
              font: {
                size: 15,
                weight: "normal",
              },
            },
            scaleID: "y",
            value: (ctx: any) => calculateAverage(),
          },
          lastValueAnnotation: {
            type: "line",
            borderColor: "transparent",
            borderDashOffset: 0,
            borderWidth: 0.8,
            label: {
              display: true,
              content: (ctx: any) => `${values[values.length - 1].toFixed(2)}`,
              position: "end",
              xAdjust: 95,
              backgroundColor: "#3a31de",
              padding: {
                x: 14,
                y: 4,
              },
              font: {
                size: 15,
                weight: "normal",
              },
            },
            scaleID: "y",
            value: (ctx: any) => values[values.length - 1],
          },
        },
      },
    },
  };

  return (
    <div className="w-full mt-8 pl-6">
      <div style={{ height: "300px", width: "100%" }}>
        <Chart
          ref={chartRef}
          type="line"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
