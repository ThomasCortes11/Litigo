import { LoginForm } from '@/components/admin/login-form';
import { ShieldCheck } from 'lucide-react';

export const metadata = { title: 'Ingresar | Panel Litigo' };

export default function AdminLoginPage() {
  return (
    <div className="grain-overlay flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl font-semibold tracking-wide text-paper">LITIGO</p>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.15em] text-gold-light">
            Panel administrativo
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white p-8 shadow-elevated">
          <h1 className="mb-1 font-display text-lg font-semibold text-ink">Iniciar sesion</h1>
          <p className="mb-6 text-xs text-slate">Acceso exclusivo para administradores.</p>
          <LoginForm />
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-paper/35">
          <ShieldCheck className="h-3.5 w-3.5" />
          Sesion protegida — 8 horas de vigencia
        </p>
      </div>
    </div>
  );
}
