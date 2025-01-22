'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const breadcrumbs = pathname
    .split('/')
    .filter((part) => part)
    .map((part, index, array) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + array.slice(0, index + 1).join('/'),
    }));

  return (
    <div className="min-h-screen flex bg-brand-cream">
      <aside className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-brand-dark text-white flex flex-col p-6 transition-all duration-300`}>
        <div className="mb-8">
          <h1 className={`text-2xl font-bold transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}>SocialSphere
          </h1>
        </div>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={`block py-2 px-4 rounded ${
                    pathname === item.href
                      ? 'bg-brand-moss text-white font-bold'
                      : 'hover:bg-brand-moss text-gray-300'
                  }`}>
                    {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition">
            Log Out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 relative">
          <div>
            <nav className="text-sm text-brand-gray">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href}>
                  <Link href={crumb.href} className={`hover:underline ${
                      index === breadcrumbs.length - 1 ? 'text-brand-dark font-bold' : ''
                    }`}>
                    {crumb.name}
                  </Link>
                  {index < breadcrumbs.length - 1 && <span> / </span>}
                </span>
              ))}
            </nav>
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90 transition">
              Notifications
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-50">
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
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90 transition ml-4">
            {isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          </button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}