import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameNavigation from "@/components/games/GameNavigation";
import NewsGrid from "@/components/news/NewsGrid";
import { news } from "@/data/news";

export default function WhereWindsMeetNewsPage() {
  return (
    <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
      <Header />

      <main>
        <section className="border-b border-white/10 bg-[#0B1012] px-6 pb-16 pt-36 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <Link
              href="/games/where-winds-meet"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
            >
              <ArrowLeft className="h-4 w-4" />
              Where Winds Meet
            </Link>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              Where Winds Meet
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Новости
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9B9D9A]">
              Последние события, обновления и важные новости мира Where Winds
              Meet.
            </p>
          </div>
        </section>

        <GameNavigation />

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  Все новости
                </h2>

                <p className="mt-2 text-sm text-[#777D7C]">
                  {news.length} публикации
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#B4B8B5] transition hover:border-[#C7A56A]/50 hover:text-[#F1EEE7]">
                <Filter className="h-4 w-4" />
                Фильтры
              </button>
            </div>

            <NewsGrid articles={news} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}