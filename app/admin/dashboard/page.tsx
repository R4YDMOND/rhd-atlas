import StatCard from "@/components/admin/widgets/StatCard";
import RecentActivity from "@/components/admin/widgets/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div className="grid grid-cols-4 gap-6">

        <StatCard title="Игры" value="3" />
        <StatCard title="Новости" value="0" />
        <StatCard title="Гайды" value="0" />
        <StatCard title="Оружие" value="0" />

      </div>

      <RecentActivity />

    </div>
  );
}