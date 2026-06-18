'use server';

import { headers } from 'next/headers';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validations/affiliate';
import { rateLimit } from '@/lib/rate-limit';

export interface LoginActionState {
  error?: string;
}

export async function loginAction(_prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  // Next.js 15: headers() es asincrono.
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const limited = rateLimit(`login:${ip}`, 8, 10 * 60 * 1000);
  if (!limited.success) {
    return { error: 'Demasiados intentos de inicio de sesion. Intenta de nuevo en unos minutos.' };
  }

  const parsed = adminLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Correo o contrasena invalidos.' };
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/admin',
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Credenciales incorrectas.' };
    }
    // NEXT_REDIRECT no es un error real: Auth.js lo usa internamente para redirigir.
    throw error;
  }
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/admin/login' });
}
