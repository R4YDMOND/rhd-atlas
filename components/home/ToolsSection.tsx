import { Calculator, Map, Trophy, ArrowUpRight } from "lucide-react";

const tools = [
  {
    title: "Интерактивная карта",
    description: "Находите важные места, ресурсы, NPC и испытания.",
    icon: Map,
  },
  {
    title: "Калькулятор билдов",
    description: "Создавайте и анализируйте собственные билды.",
    icon: Calculator,
  },
  {
    title: "Рейтинг игроков",
    description: "Сравнивайте достижения и результаты игроков.",
    icon: Trophy,
  },
];

export default function ToolsSection() {
  return (
    <section className="border-y border-white/5 bg-[#0B1012] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
            RHD Tools
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Инструменты для игроков
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#C7A56A]/40"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C7A56A]/10">
                    <Icon className="h-6 w-6 text-[#C7A56A]" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-[#66706F] transition group-hover:text-[#C7A56A]" />
                </div>

                <h3 className="mt-12 text-xl font-medium">{tool.title}</h3>

                <p className="mt-3 text-sm leading-6 text-[#9B9D9A]">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}