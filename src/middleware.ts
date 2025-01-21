import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, {
    cookieOptions: {
      name: 'sb-auth-token',
      sameSite: 'Lax',
      secure: false,
      domain: 'localhost',
    },
  });

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session in middleware:', error.message);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};