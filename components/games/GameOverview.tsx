import {
  BookOpen,
  Map,
  Swords,
  Users,
} from "lucide-react";

import { guides } from "@/data/guides";

const stats = [
  {
    label: "Гайды",
    value: String(guides.length),
    icon: BookOpen,
  },
  {
    label: "Предметы",
    value: "Скоро",
    icon: Swords,
  },
  {
    label: "Локации",
    value: "Скоро",
    icon: Map,
  },
  {
    label: "Игроки",
    value: "Скоро",
    icon: Users,
  },
];

export default function GameOverview() {
  return (
    <section className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
            Where Winds Meet
          </p>

          <h2 className="text-3xl font-semibold text-[#F1EEE7] sm:text-4xl">
            Всё необходимое для игры
          </h2>

          <p className="mt-4 max-w-2xl text-[#9B9D9A]">
            Новости, знания, инструменты и полезные материалы собраны в одном
            месте.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="h-5 w-5 text-[#C7A56A]" />

                <p className="mt-8 text-3xl font-semibold text-[#F1EEE7]">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-[#9B9D9A]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
