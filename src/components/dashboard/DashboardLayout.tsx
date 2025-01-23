'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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

  const breadcrumbs = pathname
    .split('/')
    .filter((part) => part)
    .map((part, index, array) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + array.slice(0, index + 1).join('/'),
    }));

  const handleLogout = () => {
    // Redirect to login page on logout
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-brand-cream">
      {/* Navbar for Small Devices */}
      <header className="bg-brand-dark text-white flex items-center justify-between p-4 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-brand-bronze p-2 rounded-md"
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
        <h1 className="text-lg font-bold">SocialSphere</h1>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-white bg-brand-bronze p-2 rounded-md"
        >
          Notifications
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-brand-dark text-white transition-all duration-300 z-50 lg:flex lg:w-64 ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">SocialSphere</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-brand-bronze bg-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
          {/* Navigation Links */}
          <nav className="space-y-4 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 px-4 rounded ${
                  pathname === item.href
                    ? 'bg-brand-moss text-white font-bold'
                    : 'hover:bg-brand-moss text-gray-300'
                }`}
                onClick={() => setIsSidebarOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Sidebar Footer */}
          <div className="mt-auto p-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Header */}
        <header className="hidden lg:flex h-16 bg-white shadow-md items-center justify-between px-6">
          {/* Breadcrumbs */}
          <nav className="text-sm text-brand-gray">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href}>
                <Link
                  href={crumb.href}
                  className={`hover:underline ${
                    index === breadcrumbs.length - 1 ? 'text-brand-dark font-bold' : ''
                  }`}
                >
                  {crumb.name}
                </Link>
                {index < breadcrumbs.length - 1 && <span> / </span>}
              </span>
            ))}
          </nav>
          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90 transition"
          >
            Notifications
          </button>
        </header>
        {/* Notifications Dropdown */}
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