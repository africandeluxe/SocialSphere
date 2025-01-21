'use client'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex bg-brand-cream">
      <aside className="w-64 bg-brand-dark text-white flex flex-col p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SocialSphere</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-brand-moss">Overview</a>
            </li>
            <li>
              <a href="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-brand-moss">Profile</a>
            </li>
            <li>
              <a href="/dashboard/analytics" className="block py-2 px-4 rounded hover:bg-brand-moss">Analytics</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}