import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameNavigation from "@/components/games/GameNavigation";
import { news } from "@/data/news";

type NewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsArticlePage({
  params,
}: NewsPageProps) {
  const { id } = await params;

  const article = news.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              Новость не найдена
            </h1>

            <Link
              href="/games/where-winds-meet/news"
              className="mt-6 inline-flex rounded-xl bg-[#C7A56A] px-5 py-3 text-sm font-semibold text-[#080B0D]"
            >
              Вернуться к новостям
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
          <section className="px-6 pb-12 pt-24 lg:px-10">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/games/where-winds-meet/news"
                className="mb-10 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
              >
                <ArrowLeft className="h-4 w-4" />
                Все новости
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                <span className="rounded-full border border-[#C7A56A]/30 bg-[#C7A56A]/10 px-3 py-1.5 text-[#E4C88D]">
                  {article.category}
                </span>

                <span className="flex items-center gap-2 text-[#777D7C]">
                  <CalendarDays className="h-4 w-4" />
                  {article.date}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {article.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#9B9D9A]">
                {article.excerpt}
              </p>
            </div>
          </section>

          <section className="px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#101518]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D]/40 to-transparent" />
              </div>
            </div>
          </section>

          <section className="px-6 py-16 lg:px-10">
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-8 text-[#D1D2CE]">
                  {article.excerpt}
                </p>

                <p className="mt-8 leading-8 text-[#9B9D9A]">
                  Здесь будет размещаться полный текст статьи. В будущем
                  этот контент будет добавляться через административную
                  панель, а посетители сайта будут видеть готовую
                  публикацию.
                </p>

                <h2 className="mt-12 text-3xl font-semibold text-[#F1EEE7]">
                  Основная информация
                </h2>

                <p className="mt-6 leading-8 text-[#9B9D9A]">
                  В этом блоке будет находиться полноценный материал:
                  новости, подробности обновления, описание события,
                  изображения, видео и другие необходимые элементы.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}