import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/auth') {
        if (!token) {
            return NextResponse.next();
        }

        try {
            const payloadBase64 = token.split('.')[1];

            if (!payloadBase64) {
                throw new Error('Invalid token');
            }

            const payload = JSON.parse(atob(payloadBase64));

            if (payload.role === 'Admin') {
                return NextResponse.redirect(
                    new URL('/admin/dashboard', request.url),
                );
            }

            if (payload.role === 'Employee') {
                return NextResponse.redirect(
                    new URL('/employee/dashboard', request.url),
                );
            }

            throw new Error('Invalid role');
        } catch {
            const response = NextResponse.next();
            response.cookies.delete('access_token');
            return response;
        }
    }

    // Admin
    if (pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(
                new URL('/auth', request.url),
            );
        }

        try {
            const payloadBase64 = token.split('.')[1];

            if (!payloadBase64) {
                throw new Error('Invalid token');
            }

            const payload = JSON.parse(atob(payloadBase64));

            if (payload.role !== 'Admin') {
                return NextResponse.redirect(
                    new URL('/', request.url),
                );
            }

            return NextResponse.next();
        } catch {
            const response = NextResponse.redirect(
                new URL('/auth', request.url),
            );

            response.cookies.delete('access_token');

            return response;
        }
    }

    // Employee
    if (pathname.startsWith('/employee')) {
        if (!token) {
            return NextResponse.redirect(
                new URL('/auth', request.url),
            );
        }

        try {
            const payloadBase64 = token.split('.')[1];

            if (!payloadBase64) {
                throw new Error('Invalid token');
            }

            const payload = JSON.parse(atob(payloadBase64));

            if (payload.role !== 'Employee') {
                return NextResponse.redirect(
                    new URL('/', request.url),
                );
            }

            return NextResponse.next();
        } catch {
            const response = NextResponse.redirect(
                new URL('/auth', request.url),
            );

            response.cookies.delete('access_token');

            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth',
        '/admin/:path*',
        '/employee/:path*',
    ],
};