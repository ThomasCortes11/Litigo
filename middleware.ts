import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/auth.config';

/**
 * Instancia ligera de Auth.js solo para middleware (Edge Runtime).
 * No importa Prisma/bcrypt - solo verifica el JWT de sesion ya emitido.
 */
const { auth } = NextAuth(authConfig);

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
