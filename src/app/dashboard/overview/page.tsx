'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import DashboardLayout from '@/components/DashboardLayout';
import Chart from '@/components/Chart';

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

        const { data: audienceMetrics, error: audienceError } = await supabase
          .from('audience_metrics')
          .select('new_followers, platform');

        const { data: recentPosts, error: postsError } = await supabase
          .from('posts')
          .select('content, likes, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        if (engagementError || audienceError || postsError) {
          throw new Error(
            engagementError?.message ||
            audienceError?.message ||
            postsError?.message
          );
        }

        const instagramEngagements = engagementMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .reduce((acc, metric) => acc + metric.impressions, 0);

        const tiktokEngagements = engagementMetrics
          .filter((metric) => metric.platform === 'TikTok')
          .reduce((acc, metric) => acc + metric.impressions, 0);

        const instagramFollowers = audienceMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .flatMap((metric) => metric.new_followers || []);

        const tiktokFollowers = audienceMetrics
          .filter((metric) => metric.platform === 'TikTok')
          .flatMap((metric) => metric.new_followers || []);

        const instagramGrowth = audienceMetrics
          .filter((metric) => metric.platform === 'Instagram')
          .flatMap((metric) => metric.new_followers || []);

        const tiktokGrowth = audienceMetrics
          .filter((metric) => metric.platform === 'TikTok')
          .flatMap((metric) => metric.new_followers || []);

        setMetrics({
          instagramEngagements,
          tiktokEngagements,
          instagramFollowers,
          tiktokFollowers,
          recentPosts,
          instagramGrowth,
          tiktokGrowth,
        });
      } catch (err: any) {
        console.error('Error fetching metrics:', err.message);
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
      <h1 className="text-2xl font-bold">Overview</h1>
      <p>Welcome to your dashboard. Here’s a quick overview of your activities and statistics:</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Instagram Engagement Overview</h3>
          <p className="text-brand-gray mt-2">
            Total Instagram engagements: {metrics.instagramEngagements}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">TikTok Engagement Overview</h3>
          <p className="text-brand-gray mt-2">
            Total TikTok engagements: {metrics.tiktokEngagements}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Instagram Audience Growth</h3>
          <p className="text-brand-gray mt-2">
            New Instagram followers this month: {metrics.instagramFollowers.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">TikTok Audience Growth</h3>
          <p className="text-brand-gray mt-2">
            New TikTok followers this month: {metrics.tiktokFollowers.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Recent Posts</h3>
          <ul className="text-brand-gray mt-2">
            {metrics.recentPosts.map((post, index) => (
              <li key={post.id || index}>
                {post.content} - {post.likes} likes
                </li>
              ))}
              </ul>
              </div>
      </div>
      <div className="mt-6 space-y-6">
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Follower Growth Trend</h3>
          <Chart data={{
              instagram: metrics.instagramGrowth,
              tiktok: metrics.tiktokGrowth,
            }}/>
        </div>
      </div>
    </DashboardLayout>
  );
}