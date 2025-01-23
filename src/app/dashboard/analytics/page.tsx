'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import Chart from '../../../components/dashboard/Chart';

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState({
    instagramGrowth: [] as number[],
    tiktokGrowth: [] as number[],
    topPosts: [] as { id: number; content: string; likes: number }[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: instagramData, error: instagramError } = await supabase
          .from('audience_metrics')
          .select('new_followers')
          .eq('platform', 'instagram')
          .order('created_at', { ascending: true });

        const { data: tiktokData, error: tiktokError } = await supabase
          .from('audience_metrics')
          .select('new_followers')
          .eq('platform', 'tiktok')
          .order('created_at', { ascending: true });

        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .order('likes', { ascending: false })
          .limit(3);

        if (instagramError || tiktokError || postsError) {
          throw new Error(
            instagramError?.message || tiktokError?.message || postsError?.message
          );
        }

        setMetrics({
          instagramGrowth: instagramData?.map((row) => row.new_followers) || [],
          tiktokGrowth: tiktokData?.map((row) => row.new_followers) || [],
          topPosts: posts || [],
        });
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
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Analytics</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Top Performing Posts</h3>
          <ul className="text-brand-gray mt-2">
            {metrics.topPosts.map((post) => (
              <li key={post.id}>
                {post.content} - {post.likes} likes
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 lg:mt-6 space-y-4 lg:space-y-6">
        <div className="bg-white p-4 lg:p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Follower Growth Trend</h3>
          <Chart
            data={{
              instagram: metrics.instagramGrowth,
              tiktok: metrics.tiktokGrowth,
            }}
          />
        </div>
        <div className="bg-white p-4 lg:p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">Instagram Growth</h3>
          <Chart
            data={{
              instagram: metrics.instagramGrowth,
            }}
            showLegend={false}
          />
        </div>
        <div className="bg-white p-4 lg:p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-brand-dark">TikTok Growth</h3>
          <Chart
            data={{
              tiktok: metrics.tiktokGrowth,
            }}
            showLegend={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}