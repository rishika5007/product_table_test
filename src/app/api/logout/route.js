// app/api/logout/route.js
import { NextResponse } from 'next/server';
import { destroyCookie } from 'nookies';

export async function GET(request) {
    // Destroy the authentication cookie
    destroyCookie(null, 'authToken', { path: '/' });

    // Redirect to login page after logging out
    return NextResponse.redirect(new URL('/login', request.url));
}
