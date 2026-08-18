import { AdminSidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F3EE]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-5 sm:p-7 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
