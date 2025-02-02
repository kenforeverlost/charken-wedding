import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionData } from '@lib/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let sessionData = getSessionData()
  let path = request.nextUrl.pathname
  let isLoggedIn = sessionData && sessionData?.loggedIn

  if (process.env.NEXT_PUBLIC_REQUIRE_PASSWORD === 'true') {
    if (!isLoggedIn && path !== '/' && path !== '/registry') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (isLoggedIn && path == '/') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  } else {
    if (path == '/') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
}
