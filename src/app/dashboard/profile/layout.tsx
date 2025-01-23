'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-brand-cream">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-brand-dark text-white flex flex-col p-6 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:translate-x-0 z-50`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SocialSphere</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-brand-moss"
               onClick={() => setIsSidebarOpen(false)}>
                Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-brand-moss"
                onClick={() => setIsSidebarOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard/analytics"
                className="block py-2 px-4 rounded hover:bg-brand-moss"
                onClick={() => setIsSidebarOpen(false)}>
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/dashboard/content" className="block py-2 px-4 rounded hover:bg-brand-moss"
                onClick={() => setIsSidebarOpen(false)}>
                  Content Management
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition">
            Log Out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h2 className="text-xl font-bold text-brand-dark">Profile</h2>
          <button
            className="text-brand-dark md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              ☰
          </button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
}