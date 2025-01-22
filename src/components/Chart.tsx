import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale,PointElement, Legend} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

export default function Chart({
  data,
  showLegend = true,
}: {
  data: { instagram?: number[]; tiktok?: number[] };
  showLegend?: boolean;
}) {
  const instagramData = data.instagram || [];
  const tiktokData = data.tiktok || [];

  const maxDataLength = Math.max(instagramData.length, tiktokData.length);
  const labels = Array.from({ length: maxDataLength }, (_, i) => `Week ${i + 1}`);

  if (instagramData.length === 0 && tiktokData.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Instagram Growth',
        data: instagramData,
        borderColor: '#a67d44',
        backgroundColor: 'rgba(166, 125, 68, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'TikTok Growth',
        data: tiktokData,
        borderColor: '#5e6c5b',
        backgroundColor: 'rgba(94, 108, 91, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Followers Gained',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}