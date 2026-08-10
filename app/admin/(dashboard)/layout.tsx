import { AdminSidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_8%_8%,#ffffff_0%,#f7f1e8_52%,#f0e7db_100%)]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-5 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
