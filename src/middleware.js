import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { 
  matcher: ['/admin/:path*'] 
};

export async function middleware(req) {
  const token = await getToken({ req })


  if (!token) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  if (token.role !== 1) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }



  return NextResponse.next()
}
