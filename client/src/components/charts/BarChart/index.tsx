import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import type { ChartProps } from '@/types/chart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ chartTitle, chartData }: ChartProps) => {
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
        backgroundColor: '#FF8A65',
        pointRadius: 0,
        pointHitRadius: 20,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
