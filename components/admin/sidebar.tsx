'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOutAction } from '@/lib/actions/auth-actions';

const links = [
  { href: '/admin', label: 'Panel', icon: LayoutDashboard },
  { href: '/admin/afiliados', label: 'Afiliados', icon: Users },
  { href: '/admin/configuracion', label: 'Configuracion', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-ink text-paper">
      <div className="flex h-20 items-center px-6">
        <span className="font-display text-xl font-semibold">LITIGO</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-white/10 text-paper' : 'text-paper/65 hover:bg-white/5 hover:text-paper',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOutAction} className="border-t border-white/10 p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-paper/65 hover:bg-white/5 hover:text-paper"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </button>
      </form>
    </aside>
  );
}
