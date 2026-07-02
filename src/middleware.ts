import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Propagate pathname as header so layouts can read it server-side
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Auth pages y callback: accesibles sin sesión
  if (pathname === '/admin/login' || pathname === '/admin/register' || pathname.startsWith('/auth/')) {
    if (pathname.startsWith('/auth/')) return response; // callback no redirige aunque haya sesión
    if (user) return NextResponse.redirect(new URL('/admin', request.url));
    return response;
  }

  // All other /admin/* routes require auth
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
