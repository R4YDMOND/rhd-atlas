import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

const guides = [
  {
    title: "Начало игры",
    description: "Основы, первые шаги и полезные советы.",
  },
  {
    title: "Лучшие билды",
    description: "Соберите эффективную комбинацию для своего стиля игры.",
  },
  {
    title: "Боссы и испытания",
    description: "Подготовка к самым сложным испытаниям.",
  },
];

export default function GuidesSection() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#61C8B7]">
            Knowledge base
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Популярные гайды
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <article
              key={guide.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#12191A] to-[#0B1012] p-7"
            >
              <div className="mb-12 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#61C8B7]/20 bg-[#61C8B7]/10">
                  {index === 0 ? (
                    <BookOpen className="h-5 w-5 text-[#61C8B7]" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-[#61C8B7]" />
                  )}
                </div>

                <ArrowUpRight className="h-5 w-5 text-[#66706F] transition group-hover:text-[#61C8B7]" />
              </div>

              <h3 className="text-xl font-medium">{guide.title}</h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#9B9D9A]">
                {guide.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}