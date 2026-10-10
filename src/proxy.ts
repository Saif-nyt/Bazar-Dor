

import { auth } from "./lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export async function proxy(request: NextRequest) {
     
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user
if (!user) {
  return NextResponse.redirect(new URL('/signin?protected=1', request.url))
}
return NextResponse.next()
}
 
 
export const config = {
  matcher: ['/profile/:path*', '/product:path*'],
}