import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
// See "Matching Paths" below to learn more
export const config = {
    /* match all request paths except for the ones that starts with:
    - api
    - _next/static
    - _next/image
    - favicon.com

    */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}