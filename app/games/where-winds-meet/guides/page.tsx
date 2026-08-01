import Link from "next/link";
import {
  ArrowLeft,
  Filter,
} from "lucide-react";

import GameNavigation from "@/components/games/GameNavigation";
import GuideGrid from "@/components/guides/GuideGrid";
import { guides } from "@/data/guides";

export default function WhereWindsMeetGuidesPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-[#0B1012] px-6 pb-16 pt-36 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <Link
              href="/games/where-winds-meet"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
            >
              <ArrowLeft className="h-4 w-4" />
              Where Winds Meet
            </Link>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#61C8B7]">
              Where Winds Meet
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Гайды
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9B9D9A]">
              Полезные руководства, советы и подробные материалы по Where Winds
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
                  Все гайды
                </h2>

                <p className="mt-2 text-sm text-[#777D7C]">
                  {guides.length} публикации
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#B4B8B5] transition hover:border-[#61C8B7]/50 hover:text-[#F1EEE7]">
                <Filter className="h-4 w-4" />
                Фильтры
              </button>
            </div>

            <GuideGrid guides={guides} />
          </div>
        </section>
    </>
  );
}