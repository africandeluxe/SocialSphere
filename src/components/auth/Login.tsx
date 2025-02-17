'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { session, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && session) {
      console.log('User is logged in. Redirecting to /dashboard...');
      router.push('/dashboard'); // Redirect immediately if session exists
    }
  }, [authLoading, session, router]);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login failed:', error.message);
        setError(error.message);
        return;
      }

      if (data?.session) {
        console.log('Login successful. Refreshing session...');
        
        // Refresh session to ensure cookies are properly set
        const { data: sessionData, error: refreshError } = await supabase.auth.getSession();

        if (refreshError) {
          console.error('Failed to refresh session:', refreshError.message);
          setError('Failed to refresh session. Please try again.');
          return;
        }

        console.log('Session after login:', sessionData);

        // Redirect to the dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 bg-brand-cream">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Welcome Back</h1>
          <p className="text-brand-gray mb-8">
            New to SocialSphere?{' '}
            <Link href="/signup" className="text-brand-bronze hover:underline">
              Sign up here
            </Link>
          </p>

          {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) handleLogin();
            }}
          >
            <div className="mb-4">
              <label htmlFor="email" className="block text-brand-dark mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-brand-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 bg-brand-bronze text-white rounded-lg hover:bg-opacity-90 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(/Login-Dashboard.jpg)' }}
      ></div>
    </div>
  );
}