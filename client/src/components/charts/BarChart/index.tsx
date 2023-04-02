import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import type { ChartProps } from '@/types/chart';
import { sortObjectByKeys } from '@/utils/sort';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartTitle, chartData }: ChartProps) => {
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

  const orderedData = sortObjectByKeys(chartData);
  const chartLabels = Object.keys(orderedData);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: '# of errors',
        data: Object.values(orderedData),
        backgroundColor: '#FF8A65',
        pointRadius: 0,
        pointHitRadius: 20,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
