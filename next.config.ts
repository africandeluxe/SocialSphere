import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: 'strict',
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  reactStrictMode: true,
};

export default nextConfig;