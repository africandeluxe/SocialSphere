'use client'
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-brand-cream">
      <aside className="w-64 bg-brand-dark text-white flex flex-col p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SocialSphere</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-brand-moss">Overview</Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-brand-moss">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/analytics" className="block py-2 px-4 rounded hover:bg-brand-moss">Analytics</Link>
            </li>
            <li>
              <Link href="/dashboard/content" className="block py-2 px-4 rounded hover:bg-brand-moss">Content Management</Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition">Log Out</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h2 className="text-xl font-bold text-brand-dark">Dashboard</h2>
          <div>
            <button className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90">Notifications</button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}