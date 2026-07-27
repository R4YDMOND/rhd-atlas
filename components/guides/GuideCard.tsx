import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import type { GuideArticle } from "@/data/guides";

type GuideCardProps = {
  guide: GuideArticle;
};

const difficultyStyles = {
  Начинающий: "text-[#8BC7A0] bg-[#8BC7A0]/10",
  Средний: "text-[#E4C88D] bg-[#E4C88D]/10",
  Продвинутый: "text-[#D88B8B] bg-[#D88B8B]/10",
};

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/games/where-winds-meet/guides/${guide.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101518] transition duration-300 hover:-translate-y-1 hover:border-[#61C8B7]/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#182022]">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D]/85 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-[#080B0D]/70 px-3 py-1.5 text-xs text-[#E4C88D] backdrop-blur-md">
            {guide.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition group-hover:border-[#61C8B7]">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
          <span
            className={`rounded-md px-2.5 py-1 ${difficultyStyles[guide.difficulty]}`}
          >
            {guide.difficulty}
          </span>

          <span className="text-[#777D7C]">
            Версия {guide.version}
          </span>
        </div>

        <h3 className="text-xl font-medium leading-7 text-[#F1EEE7]">
          {guide.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9B9D9A]">
          {guide.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-[#777D7C]">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" />
            {guide.date}
          </span>

          <span className="flex items-center gap-1.5 text-[#61C8B7]">
            <BookOpen className="h-3.5 w-3.5" />
            Читать
          </span>
        </div>
      </div>
    </Link>
  );
}