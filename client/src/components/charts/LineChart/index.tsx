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
import { sortObjectByKeys } from '@/utils/sort';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface LineChartProps {
  chartTitle: ChartProps['chartTitle'];
  chartData: ChartProps['chartData'][];
}

const LineChart = ({ chartTitle, chartData }: LineChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
        text: chartTitle,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          drawBorder: false,
          display: false,
        },
        // border: {
        //   dash: [2, 4],
        // },
        ticks: {
          font: {
            size: 15,
            weight: 400,
            color: '#BFBFBF',
          },
          padding: 9,
        },
      },
      y: {
        max: 100,
        min: 0,
        ticks: {
          font: {
            size: 15,
            weight: 400,
            color: '#808080',
          },
          backdropPadding: {
            x: 20,
          },
          stepSize: 20,
          padding: 24,
        },
      },
    },
  };

  // sort by keys
  const orderedData: ChartProps['chartData'][] = [];
  chartData.forEach((data) => {
    const ordered = sortObjectByKeys(data);
    orderedData.push(ordered);
  });

  const chartLabels = Object.keys(orderedData[0]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: '긴 글',
        data: Object.values(orderedData[0]),
        borderWidth: 3,
        borderColor: '#FF8A65',
        lineTension: 0.3,
        pointStyle: 'circle',
        pointRadius: 3.5,
        pointHitRadius: 20,
        pointBackgroundColor: '#FF8A65',
      },
      {
        label: '짧은 글',
        data: Object.values(orderedData[1]),
        borderWidth: 3,
        borderColor: '#83DA0D',
        lineTension: 0.3,
        pointStyle: 'circle',
        pointRadius: 3.5,
        pointHitRadius: 20,
        pointBackgroundColor: '#83DA0D',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
