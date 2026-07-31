import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      <AdminSidebar />

      <div className="flex flex-1 flex-col">

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-8">

          {children}

        </main>

      </div>

      <Toaster />

    </div>
  );
}