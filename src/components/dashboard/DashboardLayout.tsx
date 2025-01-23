'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, message: 'New comment on your post', timestamp: '2 mins ago' },
    { id: 2, message: 'You gained 5 new followers', timestamp: '10 mins ago' },
    { id: 3, message: 'Your post reached 500 likes!', timestamp: '1 hour ago' },
  ];

  const navItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Content Management', href: '/dashboard/content' },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error during logout:', error.message);
        return;
      }

      console.log('User logged out successfully.');

      router.push('/login');
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-cream">
      <aside
        className={`fixed top-0 left-0 h-full bg-brand-dark text-white transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-64 lg:w-64'
        }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">SocialSphere</h1>
            <button onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-brand-bronze bg-white p-2 rounded-md">Close</button>
          </div>
          <nav className="space-y-4 px-4 py-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}
                className={`block py-2 px-4 rounded ${
                  pathname === item.href
                    ? 'bg-brand-moss text-white font-bold'
                    : 'hover:bg-brand-moss text-gray-300'
                }`}
                onClick={() => setIsSidebarOpen(false)}>{item.name}</Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <button onClick={handleLogout}
              className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition">Log Out</button>
          </div>
        </div>
      </aside>
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <header className="hidden lg:flex h-16 bg-white shadow-md items-center justify-between px-6">
          <nav className="text-sm text-brand-gray">
            {pathname
              .split('/')
              .filter(Boolean)
              .map((part, index) => (
                <span key={index}>
                  {index > 0 && ' / '}
                  <Link href={`/${pathname.split('/').slice(0, index + 1).join('/')}`} 
                    className="hover:underline text-brand-dark">
                      {part.charAt(0).toUpperCase() + part.slice(1)}
                  </Link>
                </span>
              ))}
          </nav>
          <button onClick={() => setShowNotifications(!showNotifications)}
            className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90 transition">Notifications</button>
        </header>
        {showNotifications && (
          <div className="absolute top-16 right-4 w-64 bg-white shadow-lg rounded-md p-4 z-50">
            <h4 className="font-bold text-brand-dark mb-2">Recent Notifications</h4>
            {mockNotifications.length > 0 ? (
              <ul className="space-y-2">
                {mockNotifications.map((notification) => (
                  <li key={notification.id} className="text-sm text-brand-gray">
                    <p>{notification.message}</p>
                    <p className="text-xs text-brand-light">{notification.timestamp}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-brand-gray">No new notifications</p>
            )}
          </div>
        )}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}