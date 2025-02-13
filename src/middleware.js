import { NextResponse } from 'next/server';

export function middleware(request) {
  // const token = request.cookies.get('setofshops_user_token') || null;
  // // Exclude auth routes from middleware processing
  // const excludedPaths = ['/auth/login', '/auth/register'];
  // if (excludedPaths.includes(request.nextUrl.pathname)) {
  //   return NextResponse.next();
  // }

  // console.log(token);

  // // If no token, redirect to login
  // if (!token || !token.value) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  // try {
  //   const decoded = jwtDecode(token.value);
  //   console.log(decoded, 'Decoded Token');

  //   // Example: Check if the user has an 'admin' role
  //   if (decoded.role !== 'admin') {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   }

  //   // Allow access if the user is an admin
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error('Token decoding failed:', error);
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }
  return NextResponse.next();
}

// Apply middleware to all routes except excluded ones
export const config = {
  matcher: ['/auth/:path*'], // Apply to all routes dynamically
};
