import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Validating the credentials
        if (username !== 'emilys' || password !== 'emilyspass') {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Request to the external API
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        if (result.token) {
            // Set the cookie with the token
            setCookie(null, 'authToken', result.token, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/',
            });

            return NextResponse.json({ message: "Login successful!" });
        } else {
            return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
