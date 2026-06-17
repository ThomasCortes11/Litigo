import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/lib/auth.config';

/**
 * Configuracion completa de Auth.js (runtime de Node). Usada por:
 *  - app/api/auth/[...nextauth]/route.ts
 *  - Server Actions (lib/actions/*)
 *  - Server Components / Route Handlers que necesiten la sesion
 * NUNCA importar este archivo desde middleware.ts (usar lib/auth.config.ts).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contrasena', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email).toLowerCase().trim() },
          include: { role: true },
        });

        if (!user || !user.isActive || user.deletedAt) return null;

        const isValid = await bcrypt.compare(String(credentials.password), user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        };
      },
    }),
  ],
});
