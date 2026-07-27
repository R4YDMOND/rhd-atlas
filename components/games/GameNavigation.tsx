import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Database,
  Map,
  Newspaper,
  Swords,
  Trophy,
  Video,
} from "lucide-react";

const navigation = [
  {
    label: "Новости",
    href: "/games/where-winds-meet/news",
    icon: Newspaper,
  },
  {
    label: "Гайды",
    href: "/games/where-winds-meet/guides",
    icon: BookOpen,
  },
  {
    label: "Билды",
    href: "/games/where-winds-meet/builds",
    icon: Swords,
  },
  {
    label: "Калькулятор",
    href: "/games/where-winds-meet/calculator",
    icon: Calculator,
  },
  {
    label: "Карта",
    href: "/games/where-winds-meet/map",
    icon: Map,
  },
  {
    label: "База предметов",
    href: "/games/where-winds-meet/database",
    icon: Database,
  },
  {
    label: "Рейтинг",
    href: "/games/where-winds-meet/ranking",
    icon: Trophy,
  },
  {
    label: "Видео",
    href: "/games/where-winds-meet/videos",
    icon: Video,
  },
];

export default function GameNavigation() {
  return (
    <nav className="border-b border-white/10 bg-[#0B1012]">
      <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-6 py-3 lg:px-10">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[#9B9D9A] transition hover:bg-white/[0.05] hover:text-[#F1EEE7]"
            >
              <Icon className="h-4 w-4" />

              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}