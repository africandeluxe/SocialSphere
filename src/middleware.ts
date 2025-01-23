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
      path: '/',
      domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
    },
  });

  const { data: { session }, error } = await supabase.auth.getSession();

  console.log('Middleware: Session fetched:', session);

  if (error) {
    console.error('Middleware: Error fetching session:', error.message);
  }

  if (!session) {
    console.log('Middleware: No session found. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};

/*import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Middleware: Bypassing session validation for presentation purposes.');
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/protected-route'],
};*/