import { ArrowRight, CalendarDays } from "lucide-react";

const news = [
  {
    category: "Where Winds Meet",
    title: "Последние новости мира игры",
    date: "Сегодня",
  },
  {
    category: "Once Human",
    title: "Новые события и обновления",
    date: "Вчера",
  },
  {
    category: "The Cube",
    title: "Исследование неизвестного мира",
    date: "2 дня назад",
  },
];

export default function NewsSection() {
  return (
    <section className="border-y border-white/5 bg-[#0B1012] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              Latest news
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl">
              Последние новости
            </h2>
          </div>

          <button className="hidden items-center gap-2 text-sm text-[#C7A56A] sm:flex">
            Все новости
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#C7A56A]/40 hover:bg-white/[0.05]"
            >
              <div className="mb-8 flex items-center justify-between text-xs">
                <span className="text-[#C7A56A]">{item.category}</span>

                <span className="flex items-center gap-2 text-[#777D7C]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl font-medium leading-8 text-[#F1EEE7]">
                {item.title}
              </h3>

              <div className="mt-8 flex items-center gap-2 text-sm text-[#9B9D9A] transition group-hover:text-[#C7A56A]">
                Читать материал
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}