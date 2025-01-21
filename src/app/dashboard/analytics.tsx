import DashboardLayout from '@/components/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Engagement Overview</h3>
          <p className="text-brand-gray mt-2">Your posts have reached 5k impressions this week.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Audience Growth</h3>
          <p className="text-brand-gray mt-2">You've gained 200 new followers in the past month.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Top Performing Post</h3>
          <p className="text-brand-gray mt-2">Your top post received 300 likes this week.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}