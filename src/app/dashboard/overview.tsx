import DashboardLayout from '@/components/DashboardLayout';
import Logout from '@/components/Logout';

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Overview</h1>
      <p>Welcome to your dashboard. Here’s a quick overview of your activities and statistics:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Engagement Overview</h3>
          <p className="text-brand-gray mt-2">See how your posts are performing.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Audience Growth</h3>
          <p className="text-brand-gray mt-2">Track your audience growth over time.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Recent Posts</h3>
          <p className="text-brand-gray mt-2">View and manage your recent posts.</p>
        </div>
        <Logout />
      </div>
    </DashboardLayout>
  );
}