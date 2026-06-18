'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOutAction } from '@/lib/actions/auth-actions';

const links = [
  { href: '/admin', label: 'Panel', icon: LayoutDashboard, exact: true },
  { href: '/admin/afiliados', label: 'Afiliados', icon: Users, exact: false },
  { href: '/admin/configuracion', label: 'Configuracion', icon: Settings, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-ink">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-paper">
          LITIGO
        </Link>
        <span className="ml-2.5 rounded bg-gold/20 px-1.5 py-0.5 font-mono text-[10px] text-gold-light">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 pt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href, link.exact);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-gold/15 text-paper'
                  : 'text-paper/60 hover:bg-white/5 hover:text-paper/90',
              )}
            >
              <span className="flex items-center gap-3">
                <Icon
                  className={cn('h-4 w-4 transition-colors', active ? 'text-gold-light' : 'text-paper/40 group-hover:text-paper/70')}
                />
                {link.label}
              </span>
              {active && <ChevronRight className="h-3.5 w-3.5 text-gold-light/70" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-paper/50 transition-colors hover:bg-white/5 hover:text-paper/80"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesion
          </button>
        </form>
      </div>
    </aside>
  );
}
