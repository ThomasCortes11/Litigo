import type { NextAuthConfig } from 'next-auth';

/**
 * Configuracion "edge-safe": NO importa Prisma ni bcrypt, por lo que puede
 * usarse dentro de middleware.ts (Edge Runtime). La logica de autenticacion
 * real (que si depende de Prisma) se anade en lib/auth.ts, que solo corre
 * en runtime de Node (Route Handlers, Server Actions, Server Components).
 */
export const authConfig: NextAuthConfig = {
  pages: { signIn: '/admin/login' },
  trustHost: true,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 }, // 8 horas
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string }).id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
