import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Shield,
  Swords,
} from "lucide-react";

import type { Build } from "@/data/builds";

type BuildCardProps = {
  build: Build;
};

const styleStyles = {
  PvE: "border-[#61C8B7]/30 bg-[#61C8B7]/10 text-[#61C8B7]",
  PvP: "border-[#D88B8B]/30 bg-[#D88B8B]/10 text-[#D88B8B]",
  Гибрид:
    "border-[#E4C88D]/30 bg-[#E4C88D]/10 text-[#E4C88D]",
};

const difficultyStyles = {
  Начинающий: "text-[#8BC7A0]",
  Средний: "text-[#E4C88D]",
  Продвинутый: "text-[#D88B8B]",
};

export default function BuildCard({
  build,
}: BuildCardProps) {
  return (
    <Link
      href={`/games/where-winds-meet/builds/${build.id}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101518] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C7A56A]/50"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#C7A56A]/5 blur-3xl transition duration-500 group-hover:bg-[#C7A56A]/10" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C7A56A]/20 bg-[#C7A56A]/10">
            <Swords className="h-5 w-5 text-[#C7A56A]" />
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#777D7C] transition group-hover:border-[#C7A56A]/50 group-hover:text-[#C7A56A]">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs ${styleStyles[build.style]}`}
          >
            {build.style}
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#9B9D9A]">
            {build.role}
          </span>
        </div>

        <h3 className="text-xl font-semibold leading-7 text-[#F1EEE7]">
          {build.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#9B9D9A]">
          {build.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-[#777D7C]">
              <Swords className="h-3.5 w-3.5" />
              Оружие
            </div>

            <p className="text-sm text-[#D1D2CE]">
              {build.weapon}
            </p>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-[#777D7C]">
              <Shield className="h-3.5 w-3.5" />
              Сложность
            </div>

            <p
              className={`text-sm ${difficultyStyles[build.difficulty]}`}
            >
              {build.difficulty}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-[#777D7C]">
          <CalendarDays className="h-3.5 w-3.5" />
          Обновлено {build.updatedAt}
        </div>
      </div>
    </Link>
  );
}