import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;