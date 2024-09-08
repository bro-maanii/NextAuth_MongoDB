import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Redirect to /home if the path is empty
    const path = request.nextUrl.pathname
    const isPublicPath = path==='/verify' || path==='/login' || path==='/signup'
    const token = request.cookies.get('token')
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(isPublicPath && token ) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/verify', '/login', '/signup', '/', '/profile']
}