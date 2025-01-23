import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const isProduction = process.env.NODE_ENV === 'production';

  const supabase = createMiddlewareClient({ req, res }, {
    cookieOptions: {
      name: 'sb-auth-token',
      sameSite: 'Lax',
      secure: isProduction,
      domain: isProduction ? process.env.COOKIE_DOMAIN : 'localhost',
    },
  });

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session in middleware:', error.message);
    }

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (err) {
    console.error('Unexpected error in middleware:', err);
    return NextResponse.redirect(new URL('/error', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};