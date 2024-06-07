/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
type Props = {
  chartData: any;
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  title: {
    display: true,
    text: " Grafico de barras",
  },
};
export function BarChart({ chartData }: Props) {
  return <Bar data={chartData} options={options} />;
}
