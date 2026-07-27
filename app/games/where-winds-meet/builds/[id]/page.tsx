import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Shield,
  Sparkles,
  Swords,
  Target,
  Zap,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameNavigation from "@/components/games/GameNavigation";
import { builds } from "@/data/builds";

type BuildPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BuildPage({
  params,
}: BuildPageProps) {
  const { id } = await params;

  const build = builds.find(
    (item) => item.id === Number(id)
  );

  if (!build) {
    return (
      <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              Билд не найден
            </h1>

            <Link
              href="/games/where-winds-meet/builds"
              className="mt-6 inline-flex rounded-xl bg-[#C7A56A] px-5 py-3 text-sm font-semibold text-[#080B0D]"
            >
              Вернуться к билдам
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
      <Header />

      <main>
        <GameNavigation />

        <article>
          <section className="border-b border-white/10 bg-[#0B1012] px-6 pb-16 pt-24 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <Link
                href="/games/where-winds-meet/builds"
                className="mb-10 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
              >
                <ArrowLeft className="h-4 w-4" />
                Все билды
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#61C8B7]/30 bg-[#61C8B7]/10 px-3 py-1.5 text-sm text-[#61C8B7]">
                  {build.style}
                </span>

                <span className="rounded-full border border-[#C7A56A]/30 bg-[#C7A56A]/10 px-3 py-1.5 text-sm text-[#E4C88D]">
                  {build.role}
                </span>

                <span className="text-sm text-[#777D7C]">
                  Обновлено {build.updatedAt}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {build.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#9B9D9A]">
                {build.description}
              </p>
            </div>
          </section>

          <section className="px-6 py-12 lg:px-10">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
                <Swords className="h-5 w-5 text-[#C7A56A]" />

                <p className="mt-5 text-sm text-[#777D7C]">
                  Основное оружие
                </p>

                <p className="mt-2 text-xl font-semibold">
                  {build.weapon}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
                <Shield className="h-5 w-5 text-[#61C8B7]" />

                <p className="mt-5 text-sm text-[#777D7C]">
                  Сложность
                </p>

                <p className="mt-2 text-xl font-semibold">
                  {build.difficulty}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
                <Target className="h-5 w-5 text-[#E4C88D]" />

                <p className="mt-5 text-sm text-[#777D7C]">
                  Стиль игры
                </p>

                <p className="mt-2 text-xl font-semibold">
                  {build.style}
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 lg:px-10">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
              <div className="space-y-8">
                <div className="rounded-2xl border border-white/10 bg-[#101518] p-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[#C7A56A]" />

                    <h2 className="text-2xl font-semibold">
                      Описание билда
                    </h2>
                  </div>

                  <p className="mt-6 leading-8 text-[#9B9D9A]">
                    {build.description}
                  </p>

                  <p className="mt-5 leading-8 text-[#9B9D9A]">
                    Этот билд предназначен для игроков, которые хотят
                    использовать сбалансированный набор оружия, навыков и
                    характеристик.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#101518] p-8">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-[#61C8B7]" />

                    <h2 className="text-2xl font-semibold">
                      Рекомендуемые навыки
                    </h2>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "Основной атакующий навык",
                      "Навык мобильности",
                      "Защитная способность",
                      "Финальная способность",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <Check className="h-4 w-4 text-[#61C8B7]" />

                        <span className="text-sm text-[#D1D2CE]">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#101518] p-8">
                  <h2 className="text-2xl font-semibold">
                    Как использовать билд
                  </h2>

                  <p className="mt-6 leading-8 text-[#9B9D9A]">
                    В этом разделе будет подробное описание игровой ротации,
                    приоритетов характеристик и рекомендаций по использованию
                    билда в различных ситуациях.
                  </p>
                </div>
              </div>

              <aside className="h-fit space-y-6 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
                  <h3 className="font-semibold">
                    Информация о билде
                  </h3>

                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#777D7C]">
                        Игра
                      </span>

                      <span className="text-right text-[#D1D2CE]">
                        {build.game}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#777D7C]">
                        Оружие
                      </span>

                      <span className="text-right text-[#D1D2CE]">
                        {build.weapon}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#777D7C]">
                        Роль
                      </span>

                      <span className="text-right text-[#D1D2CE]">
                        {build.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#777D7C]">
                        Обновление
                      </span>

                      <span className="flex items-center gap-2 text-right text-[#D1D2CE]">
                        <CalendarDays className="h-4 w-4 text-[#777D7C]" />
                        {build.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#C7A56A]/20 bg-[#C7A56A]/5 p-6">
                  <h3 className="font-semibold text-[#E4C88D]">
                    Калькулятор билда
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#9B9D9A]">
                    В будущем этот билд можно будет открыть в калькуляторе и
                    настроить под свой стиль игры.
                  </p>

                  <button
                    disabled
                    className="mt-5 w-full cursor-not-allowed rounded-xl border border-[#C7A56A]/20 px-4 py-3 text-sm text-[#777D7C]"
                  >
                    Скоро
                  </button>
                </div>
              </aside>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}