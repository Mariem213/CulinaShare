/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // Check if user is trying to access a protected route
    if (request.nextUrl.pathname.startsWith('/dashboard')) {

        // Check for the session cookie
        const cookie = request.cookies.get('session')?.value;

        if (!cookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Verify the token is real & Check Role
            const session = await decrypt(cookie);

            // Check if user is admin
            if (session?.user?.role !== 'admin') {
                return NextResponse.rewrite(new URL('/404', request.url));
            }

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};