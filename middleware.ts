import { NextResponse, type NextRequest } from 'next/server'
import { verifyJWT } from './lib/auth/jwt'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Define protected routes that require authentication
  const protectedRoutes = ['/cart', '/checkout', '/order-history', '/wishlist', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  
  if (isProtectedRoute) {
    const token = request.cookies.get('access_token')?.value
    
    if (!token) {
      // No token, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

    // Verify the token
    const user = await verifyJWT(token)
    
    if (!user) {
      // Invalid token, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

    // Add user info to request headers for API routes to use
    response.headers.set('x-user-id', user.id)
    response.headers.set('x-user-email', user.email)
  }

  return response
}

export const config = {
  matcher: [
    /*
     *
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
