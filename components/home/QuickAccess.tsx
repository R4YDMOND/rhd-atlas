// components/home/QuickAccess.tsx

import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Crosshair,
  FileText,
  Map,
  Play,
} from "lucide-react";

const quickAccessItems = [
  {
    title: "Новости",
    description: "Будьте в курсе последних событий",
    icon: FileText,
    href: "/news",
    glow: "bg-[#C7A56A]/10",
    iconWrapper: "border-[#C7A56A]/30 bg-[#C7A56A]/10 text-[#E4C88D]",
    line: "bg-[#C7A56A]",
  },
  {
    title: "Гайды",
    description: "Подробные руководства по играм",
    icon: BookOpen,
    href: "/guides",
    glow: "bg-[#2F9D91]/10",
    iconWrapper: "border-[#2F9D91]/30 bg-[#2F9D91]/10 text-[#61C8B7]",
    line: "bg-[#2F9D91]",
  },
  {
    title: "Интерактивная карта",
    description: "Исследуйте миры и находите секреты",
    icon: Map,
    href: "/tools/map",
    glow: "bg-[#C7A56A]/10",
    iconWrapper: "border-[#C7A56A]/30 bg-[#C7A56A]/10 text-[#E4C88D]",
    line: "bg-[#C7A56A]",
  },
  {
    title: "Калькулятор",
    description: "Оптимизируйте своего персонажа",
    icon: Calculator,
    href: "/tools/calculator",
    glow: "bg-[#2F9D91]/10",
    iconWrapper: "border-[#2F9D91]/30 bg-[#2F9D91]/10 text-[#61C8B7]",
    line: "bg-[#2F9D91]",
  },
  {
    title: "Билды",
    description: "Лучшие сборки от сообщества",
    icon: Crosshair,
    href: "/builds",
    glow: "bg-[#C7A56A]/10",
    iconWrapper: "border-[#C7A56A]/30 bg-[#C7A56A]/10 text-[#E4C88D]",
    line: "bg-[#C7A56A]",
  },
  {
    title: "Видео",
    description: "Обзоры, гайды и прохождения",
    icon: Play,
    href: "/video",
    glow: "bg-[#2F9D91]/10",
    iconWrapper: "border-[#2F9D91]/30 bg-[#2F9D91]/10 text-[#61C8B7]",
    line: "bg-[#2F9D91]",
  },
];

export default function QuickAccess() {
  return (
    <section className="relative z-20 mx-auto -mt-6 max-w-[1600px] px-6 lg:px-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101518]/95 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A56A]/40 hover:bg-[#151C20]"
            >
              {/* Glow */}
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${item.glow}`}
              />

              <div className="relative">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${item.iconWrapper}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="text-sm font-semibold text-[#F1EEE7]">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#626866]">
                  {item.description}
                </p>

                <div
                  className={`mt-4 h-px w-0 transition-all duration-300 group-hover:w-full ${item.line}`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}