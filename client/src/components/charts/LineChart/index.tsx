import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import type { ChartProps } from '@/types/chart';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const LineChart = ({ chartTitle, chartData }: ChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        max: 1.0,
        min: 0.0,
      },
    },
  };

  const chartLabels = Object.keys(chartData);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: '# of errors',
        data: Object.values(chartData),
        borderWidth: 3,
        borderColor: '#FF8A65',
        lineTension: 0.3,
        pointRadius: 0,
        pointHitRadius: 20,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
