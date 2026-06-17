import { LoginForm } from '@/components/admin/login-form';

export const metadata = { title: 'Ingresar | Panel Litigo' };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-elevated">
        <p className="text-center font-display text-2xl font-semibold text-ink">LITIGO</p>
        <p className="mt-1 text-center text-sm text-slate">Panel administrativo</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
