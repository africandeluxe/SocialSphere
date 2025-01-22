'use client'
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      console.log('User logged out successfully');
      router.replace('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={handleLogout} disabled={loading} className={`px-4 py-2 rounded-lg transition ${
        loading
          ? 'bg-red-400 text-white cursor-not-allowed'
          : 'bg-red-500 text-white hover:bg-red-600'
      }`}>{loading ? 'Logging Out...' : 'Log Out'}</button>
  );
}