import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServer } from '@/supabase/server';
import { publicRoutes } from '@/lib/constants/publicRoutes';

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = await supabaseServer();

    // Check if route is public
    const isPublic = publicRoutes.some((path) => {
        // For root path, match exactly or if it's a home route descendant
        if (path === '/') {
            return req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/home');
        }
        return req.nextUrl.pathname.startsWith(path);
    });

    if (isPublic) return res;

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (process.env.NODE_ENV === 'development') {
        console.log('🔐 Auth check:', { user: user?.email, error: error?.message });
    }

    if (!user) {
        const redirectUrl = new URL('/auth/login', req.url);
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static files (images, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif)$).*)',
    ],
};
