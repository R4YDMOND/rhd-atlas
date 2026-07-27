import { ArrowRight, Clock3 } from "lucide-react";

export default function UpdatesSection() {
  return (
    <section className="border-t border-white/5 bg-[#0B1012] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
            Game updates
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Последние обновления игр
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
          {[
            "Where Winds Meet",
            "Once Human",
            "The Cube",
          ].map((game, index) => (
            <div
              key={game}
              className="flex flex-col gap-4 border-b border-white/10 p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-lg font-medium">{game}</p>

                <p className="mt-1 text-sm text-[#9B9D9A]">
                  Последнее обновление игры
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2 text-xs text-[#777D7C]">
                  <Clock3 className="h-4 w-4" />
                  {index + 1} день назад
                </span>

                <ArrowRight className="h-4 w-4 text-[#C7A56A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}