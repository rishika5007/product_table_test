import { NextResponse } from 'next/server';
// import { destroyCookie } from 'cookies';

export async function GET(request) {
    // Destroy the authentication cookie
    destroyCookie({ req: request }, 'authToken', { path: '/' });

    // Redirect to the login page or home page after logging out
    return NextResponse.redirect(new URL('/', request.url));
}
