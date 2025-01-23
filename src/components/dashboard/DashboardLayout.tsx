'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsNavbarVisible(false); // Hide navbar when scrolling down
    } else {
      setIsNavbarVisible(true); // Show navbar when scrolling up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-brand-dark text-white transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">SocialSphere</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-brand-bronze bg-white p-2 rounded-md">
            Close
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto space-y-4 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 px-4 rounded ${
                pathname === item.href
                  ? 'bg-brand-moss text-white font-bold'
                  : 'hover:bg-brand-moss text-gray-300'
              }`}
              onClick={() => setIsSidebarOpen(false)}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Navbar */}
        <header
          className={`fixed top-0 left-0 right-0 lg:static bg-white shadow-md transition-transform duration-300 z-40 ${
            isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
          <div className="flex items-center justify-between px-6 h-16">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-brand-bronze p-2 rounded-md">
              {isSidebarOpen ? 'Close' : 'Menu'}
            </button>
            <nav className="hidden lg:block text-sm text-brand-gray">
              {pathname
                .split('/')
                .filter(Boolean)
                .map((part, index) => (
                  <span key={index}>
                    {index > 0 && ' / '}
                    <Link
                      href={`/${pathname.split('/').slice(0, index + 1).join('/')}`}
                      className="hover:underline text-brand-dark">
                      {part.charAt(0).toUpperCase() + part.slice(1)}
                    </Link>
                  </span>
                ))}
            </nav>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="py-2 px-4 bg-brand-bronze text-white rounded hover:bg-opacity-90 transition">
              Notifications
            </button>
          </div>
        </header>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-16 right-4 w-64 bg-white shadow-lg rounded-md p-4 z-50">
            <h4 className="font-bold text-brand-dark mb-2">Recent Notifications</h4>
            <p className="text-sm text-brand-gray">No new notifications</p>
          </div>
        )}

        {/* Page Content */}
        <main className="pt-16 lg:pt-0 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
