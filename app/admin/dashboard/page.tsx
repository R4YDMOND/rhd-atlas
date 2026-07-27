import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

import StatCard from "@/components/admin/widgets/StatCard";
import RecentActivity from "@/components/admin/widgets/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <AdminSidebar />

      <main className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8 space-y-8 overflow-y-auto">
          <div className="grid grid-cols-4 gap-6">
            <StatCard title="Игры" value="3" />
            <StatCard title="Новости" value="0" />
            <StatCard title="Гайды" value="0" />
            <StatCard title="Оружие" value="0" />
          </div>

          <RecentActivity />
        </div>
      </main>
    </div>
  );
}