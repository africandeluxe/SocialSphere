import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  TooltipItem, // Import TooltipItem type
} from 'chart.js';

// Register ChartJS components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

interface ChartProps {
  data: {
    instagram?: number[];
    tiktok?: number[];
  };
  showLegend?: boolean;
}

export default function Chart({ data, showLegend = true }: ChartProps) {
  const { instagram = [], tiktok = [] } = data;

  // Generate labels based on the maximum data length
  const maxDataLength = Math.max(instagram.length, tiktok.length);
  const labels = Array.from({ length: maxDataLength }, (_, i) => `Week ${i + 1}`);

  // Display a fallback message if no data is provided
  if (instagram.length === 0 && tiktok.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Chart configuration
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Instagram Growth',
        data: instagram,
        borderColor: '#a67d44',
        backgroundColor: 'rgba(166, 125, 68, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'TikTok Growth',
        data: tiktok,
        borderColor: '#5e6c5b',
        backgroundColor: 'rgba(94, 108, 91, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => // Use TooltipItem type
            `${tooltipItem.dataset.label}: ${tooltipItem.raw} followers`,
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Followers Gained',
          font: {
            size: 12,
          },
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
      <Line data={chartData} options={options} />
    </div>
  );
}