'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import Chart from '../../../components/dashboard/Chart';
import ContentCalendar from '../../../components/dashboard/ContentCalendar';
interface Post {
  id: number;
  content: string;
  likes: number;
}
interface Metrics {
  instagramEngagements: number;
  tiktokEngagements: number;
  instagramFollowers: number[];
  tiktokFollowers: number[];
  recentPosts: Post[];
  instagramGrowth: number[];
  tiktokGrowth: number[];
}

export default function DashboardOverview() {
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
        setError(null);

        const { data: engagementMetrics, error: engagementError } = await supabase
          .from('engagement_metrics')
          .select('impressions, platform');

        if (engagementError) throw engagementError;

        const instagramEngagements = engagementMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .reduce((acc, metric) => acc + metric.impressions, 0);

        const tiktokEngagements = engagementMetrics
          .filter((metric) => metric.platform === 'TikTok')
          .reduce((acc, metric) => acc + metric.impressions, 0);

        const { data: recentPosts, error: postsError } = await supabase
          .from('posts')
          .select('id, content, likes')
          .order('created_at', { ascending: false })
          .limit(3);

        if (postsError) throw postsError;

        const { data: audienceMetrics, error: audienceError } = await supabase
          .from('audience_metrics')
          .select('new_followers, platform');

        if (audienceError) throw audienceError;

        const instagramGrowth = audienceMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .map((metric) => metric.new_followers);

        const tiktokGrowth = audienceMetrics
          .filter((metric) => metric.platform === 'TikTok')
          .map((metric) => metric.new_followers);

        setMetrics({
          instagramEngagements,
          tiktokEngagements,
          instagramFollowers: instagramGrowth,
          tiktokFollowers: tiktokGrowth,
          recentPosts: recentPosts || [],
          instagramGrowth,
          tiktokGrowth,
        });
      } catch (err: unknown) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load metrics. Please try again.');
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
              {metrics.recentPosts.map((post) => (
                <li key={post.id} className="text-sm">
                  {post.content} - {post.likes} likes
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Follower Growth Trend</h3>
            <Chart data={{
                instagram: metrics.instagramGrowth,
                tiktok: metrics.tiktokGrowth,
              }}/>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContentCalendar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}