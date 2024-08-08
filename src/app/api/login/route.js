// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Validate credentials
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

        const data = await response.json();
        const token = data.token;

        // Set the token in a cookie
        const cookie = serialize('authToken', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
            sameSite: 'Strict',
            path: '/',
        });

        const res = NextResponse.json(data);
        res.headers.set('Set-Cookie', cookie);
        return res;
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
