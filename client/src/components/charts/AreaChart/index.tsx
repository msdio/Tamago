import type { ChartArea, ChartData } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';

import type { ChartProps } from '@/types/chart';
import { sortObjectByKeys } from '@/utils/sort';
import { getTierLevel } from '@/utils/tier';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels,
);

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(1, 'rgba(247, 148, 29, 0.3)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');

  return gradient;
};

const AreaChart = ({ chartTitle, chartData }: ChartProps) => {
  const chartRef = useRef<any>(null);
  const [chartDataState, setChartDataState] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    if (!chartRef || !chartRef.current) {
      return;
    }

    const orderedData = sortObjectByKeys(chartData);
    const chartLabels = Object.keys(orderedData);

    const data = {
      labels: chartLabels,
      datasets: [
        {
          fill: true,
          label: 'tier info',
          data: Object.values(orderedData),
          borderWidth: 2,
          borderColor: '#FF8A65',
          pointStyle: 'circle',
          pointRadius: 3.5,
          pointHitRadius: 20,
          pointBackgroundColor: '#FF8A65',
          backgroundColor: createGradient(chartRef.current.ctx, chartRef.current.chartArea),
        },
      ],
    };

    setChartDataState(data);
  }, [chartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: chartTitle,
      },
      datalabels: {
        color: '#FF8A65',
        anchor: 'start',
        align: 'end',
        labels: {
          title: {
            font: {
              family: 'GangwonEduPower',
              size: 18,
            },
            formatter: (value: number) => 'Lv.' + getTierLevel(value) + '\n\n',
          },
          value: {
            formatter: (value: number) => Math.round(value) + '점\n',
            font: {
              family: 'Pretendard',
              color: '#FFA68A',
              size: 17,
            },
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 15,
            weight: 400,
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  return <Line ref={chartRef} options={options} data={chartDataState}></Line>;
};

export default AreaChart;
