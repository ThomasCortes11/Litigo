import { AdminSidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
