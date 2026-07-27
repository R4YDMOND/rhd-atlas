import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { NewsArticle } from "@/data/news";

type NewsCardProps = {
  article: NewsArticle;
};

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/games/where-winds-meet/news/${article.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101518] transition duration-300 hover:-translate-y-1 hover:border-[#C7A56A]/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#182022]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D]/80 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#080B0D]/70 px-3 py-1.5 text-xs text-[#E4C88D] backdrop-blur-md">
          {article.category}
        </span>

        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition group-hover:border-[#C7A56A]">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-xs text-[#777D7C]">
          <CalendarDays className="h-3.5 w-3.5" />
          {article.date}
        </div>

        <h3 className="text-xl font-medium leading-7 text-[#F1EEE7]">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9B9D9A]">
          {article.excerpt}
        </p>

        <div className="mt-6 text-sm text-[#C7A56A]">
          Читать статью →
        </div>
      </div>
    </Link>
  );
}