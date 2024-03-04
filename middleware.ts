import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

    const isLogin = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    
    if(isLogin && pathname == '/auth/signin'){
        return NextResponse.redirect(new URL('/example', req.url));
    }
    
    if (!isLogin && pathname !== '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
}

export const config = {
    matcher: [
        '/example',
    ]
};