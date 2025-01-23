'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import Chart from '../../../components/dashboard/Chart';
import ContentCalendar from '../../../components/dashboard/ContentCalendar';

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState({
    instagramEngagements: 0,
    tiktokEngagements: 0,
    instagramFollowers: [],
    tiktokFollowers: [],
    recentPosts: [],
    instagramGrowth: [],
    tiktokGrowth: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const { data: engagementMetrics, error: engagementError } = await supabase
          .from('engagement_metrics')
          .select('impressions, platform');

        if (engagementError) throw engagementError;

        const instagramEngagements = engagementMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .reduce((acc, metric) => acc + metric.impressions, 0);

        setMetrics((prev) => ({
          ...prev,
          instagramEngagements,
        }));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching metrics:', err.message);
          setError('Failed to load metrics. Please try again.');
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          Loading metrics...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard. Here’s a quick overview of your activities and statistics:
        </p>

        {error && <p className="text-red-500">{error}</p>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Instagram Engagement Overview</h3>
            <p className="text-gray-600 mt-2">
              Total Instagram engagements: {metrics.instagramEngagements}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">TikTok Engagement Overview</h3>
            <p className="text-gray-600 mt-2">
              Total TikTok engagements: {metrics.tiktokEngagements}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Instagram Audience Growth</h3>
            <p className="text-gray-600 mt-2">
              New Instagram followers this month: {metrics.instagramFollowers.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">TikTok Audience Growth</h3>
            <p className="text-gray-600 mt-2">
              New TikTok followers this month: {metrics.tiktokFollowers.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
            <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
            <ul className="text-gray-600 mt-4 space-y-2">
              {metrics.recentPosts.map((post, index) => (
                <li key={post.id || index} className="text-sm">
                  {post.content} - {post.likes} likes
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts and Calendar */}
        <div className="mt-10 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Follower Growth Trend</h3>
            <Chart
              data={{
                instagram: metrics.instagramGrowth,
                tiktok: metrics.tiktokGrowth,
              }}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContentCalendar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}