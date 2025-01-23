'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import Chart from '../../../components/dashboard/Chart';
import ContentCalendar from '../../../components/dashboard/ContentCalendar';

// Define the type for a single post
type Post = {
  id: string; // Assuming IDs are strings; change to `number` if needed
  content: string;
  likes: number;
};

// Define the type for the metrics object
type Metrics = {
  instagramEngagements: number;
  tiktokEngagements: number;
  instagramFollowers: number[];
  tiktokFollowers: number[];
  recentPosts: Post[];
  instagramGrowth: number[];
  tiktokGrowth: number[];
};

export default function DashboardOverview() {
  // Use the Metrics type for the state
  const [metrics, setMetrics] = useState<Metrics>({
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Overview</h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard. Here’s a quick overview of your activities and statistics:
        </p>

        {error && <p className="text-red-500">{error}</p>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold text-brand-dark">Instagram Engagement Overview</h3>
            <p className="text-gray-600 mt-2">
              Total Instagram engagements: {metrics.instagramEngagements}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold text-brand-dark">TikTok Engagement Overview</h3>
            <p className="text-gray-600 mt-2">
              Total TikTok engagements: {metrics.tiktokEngagements}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold text-brand-dark">Instagram Audience Growth</h3>
            <p className="text-gray-600 mt-2">
              New Instagram followers this month: {metrics.instagramFollowers.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold text-brand-dark">TikTok Audience Growth</h3>
            <p className="text-gray-600 mt-2">
              New TikTok followers this month: {metrics.tiktokFollowers.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg col-span-1 lg:col-span-2">
            <h3 className="text-lg font-bold text-brand-dark">Recent Posts</h3>
            <ul className="text-gray-600 mt-2 space-y-2">
              {metrics.recentPosts.map((post, index) => (
                <li key={post.id || index}>
                  {post.content} - {post.likes} likes
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts and Calendar */}
        <div className="mt-6 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold text-brand-dark">Follower Growth Trend</h3>
            <Chart
              data={{
                instagram: metrics.instagramGrowth,
                tiktok: metrics.tiktokGrowth,
              }}
            />
          </div>
          <ContentCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
}