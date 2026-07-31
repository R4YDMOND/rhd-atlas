"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Gamepad2,
  Newspaper,
  BookOpen,
  Swords,
  Shield,
  ScrollText,
  Database,
  Calculator,
  Map,
  Users,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Панель управления", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Игры", href: "/admin/games", icon: Gamepad2 },
  { name: "Новости", href: "/admin/content?type=news", icon: Newspaper },
  { name: "Гайды", href: "/admin/content?type=guides", icon: BookOpen },
  { name: "Билды", href: "/admin/content?type=builds", icon: Swords },
  { name: "Оружие", href: "/admin/weapons", icon: Swords },
  { name: "Экипировка", href: "/admin/equipment", icon: Shield },
  { name: "Навыки", href: "/admin/skills", icon: ScrollText },
  { name: "База данных", href: "/admin/database", icon: Database },
  { name: "Калькулятор", href: "/admin/calculator", icon: Calculator },
  { name: "Интерактивная карта", href: "/admin/map", icon: Map },
  { name: "Пользователи", href: "/admin/users", icon: Users },
  { name: "Настройки", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-amber-400">
          RHD Atlas Admin
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}