'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signupError) {
        setError(`Signup Error: ${signupError.message}`);
        return;
      }

      setMessage(
        'Signup successful! Please check your email to confirm your account before logging in.'
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Unexpected error during signup:', err.message);
        setError('An unexpected error occurred. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 bg-brand-cream">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Create an Account</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={(e) => {
              e.preventDefault();
              if (!loading) handleSignup();
            }}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-brand-dark mb-2">
                Full Name
              </label>
              <input type="text" id="fullName" placeholder="John Doe" value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze" required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-brand-dark mb-2">
                Email Address
              </label>
              <input type="email" id="email" placeholder="john.doe@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze" required/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-brand-dark mb-2">
                Password
              </label>
              <input type="password" id="password" placeholder="********" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze"
                required/>
            </div>
            <button type="submit"
              className={`w-full py-2 bg-brand-bronze text-white rounded-lg hover:bg-opacity-90 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 bg-cover bg-center"
      style={{ backgroundImage: 'url(/dashboard-signup.jpg)' }}>
      </div>
    </div>
  );
}