import { AdminSidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
