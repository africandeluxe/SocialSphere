'use client'

import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Test Router</h1>
      <button
        onClick={() => {
          console.log('Redirecting to /dashboard...');
          router.push('/dashboard');
        }}>
          Go to Dashboard
      </button>
    </div>
  );
}