import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import GameNavigation from "@/components/games/GameNavigation";
import { guides } from "@/data/guides";

type GuidePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GuidePage({
  params,
}: GuidePageProps) {
  const { id } = await params;

  const guide = guides.find(
    (item) => item.id === Number(id)
  );

  if (!guide) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">
            Гайд не найден
          </h1>

          <Link
            href="/games/where-winds-meet/guides"
            className="mt-6 inline-flex rounded-xl bg-[#C7A56A] px-5 py-3 text-sm font-semibold text-[#080B0D]"
          >
            Вернуться к гайдам
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <GameNavigation />

      <article>
          <section className="px-6 pb-12 pt-24 lg:px-10">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/games/where-winds-meet/guides"
                className="mb-10 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
              >
                <ArrowLeft className="h-4 w-4" />
                Все гайды
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#61C8B7]/30 bg-[#61C8B7]/10 px-3 py-1.5 text-sm text-[#61C8B7]">
                  {guide.category}
                </span>

                <span className="rounded-full bg-[#E4C88D]/10 px-3 py-1.5 text-sm text-[#E4C88D]">
                  {guide.difficulty}
                </span>

                <span className="text-sm text-[#777D7C]">
                  Версия {guide.version}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {guide.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#9B9D9A]">
                {guide.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-[#777D7C]">
                <CalendarDays className="h-4 w-4" />
                Обновлено {guide.date}
              </div>
            </div>
          </section>

          <section className="px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#101518]">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section className="px-6 py-16 lg:px-10">
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#61C8B7]" />

                  <h2 className="font-semibold">
                    Содержание гайда
                  </h2>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-[#9B9D9A]">
                  <li>01. Основная информация</li>
                  <li>02. Полезные советы</li>
                  <li>03. Важные детали</li>
                  <li>04. Частые ошибки</li>
                </ul>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-8 text-[#D1D2CE]">
                  {guide.excerpt}
                </p>

                <h2 className="mt-12 text-3xl font-semibold text-[#F1EEE7]">
                  Основная информация
                </h2>

                <p className="mt-6 leading-8 text-[#9B9D9A]">
                  Здесь будет размещаться полноценный текст гайда. В будущем
                  материал можно будет добавлять через административную панель,
                  используя текст, изображения, видео, таблицы и другие блоки.
                </p>

                <h2 className="mt-12 text-3xl font-semibold text-[#F1EEE7]">
                  Полезные советы
                </h2>

                <p className="mt-6 leading-8 text-[#9B9D9A]">
                  Этот раздел будет содержать подробные рекомендации и
                  практические советы для игроков.
                </p>
              </div>
            </div>
          </section>
        </article>
    </>
  );
}