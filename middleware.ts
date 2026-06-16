import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

/**
 * Protege todo el arbol /admin excepto /admin/login.
 * El control de roles mas fino (ej: solo SUPERADMIN puede editar
 * configuracion) se valida ademas dentro de cada Server Action.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const loginUrl = new URL('/admin/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
