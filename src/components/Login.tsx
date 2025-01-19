'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 bg-brand-cream">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Welcome Back</h1>
          <p className="text-brand-gray mb-8">
            New to SocialSphere? <Link href="/signup" className="text-brand-bronze hover:underline">Sign up here</Link>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-brand-dark mb-2">Email Address</label> 
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze"/>
            </div>
            <div className="mb-6"><input type="password" id="password" placeholder="********" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:border-brand-bronze"/>
            </div>
            <div className="flex items-center justify-between mb-4">
              <a href="/forgot-password" className="text-brand-bronze hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full py-2 bg-brand-bronze text-white rounded-lg hover:bg-opacity-90 transition">
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/Login-Dashboard.jpg)' }}>
      </div>
    </div>
  );
}