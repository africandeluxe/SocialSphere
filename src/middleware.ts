/*import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Initialize Supabase client with request and response
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Fetch session
    const { data: { session } } = await supabase.auth.getSession();

    console.log('Middleware: Session fetched:', session);

    if (!session) {
      console.log('Middleware: No session found. Redirecting to /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log('Middleware: Session exists. Proceeding to the requested route.');
    return res;
  } catch (err) {
    console.error('Middleware: Unexpected error occurred:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Middleware: Bypassing session validation for presentation purposes.');
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};