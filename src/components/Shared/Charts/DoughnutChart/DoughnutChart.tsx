import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {
  chartData: any;
};
export function DoughnutChart({ chartData }: Props) {
  return <Doughnut data={chartData}  width={300} height={10}/>;
}
