import { NextResponse } from 'next/server';
import { supabase } from './src/lib/supabaseClient';

export async function middleware(req: Request) {
  const { data: session } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}