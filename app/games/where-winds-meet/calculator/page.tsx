"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Calculator, Info } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameNavigation from "@/components/games/GameNavigation";
import WeaponSkillSelect from "@/components/calculator/WeaponSkillSelect";
import type { WwmSkill } from "@/data/wwm/skills";

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#777D7C]">
        {label}
      </p>
      <p className="text-lg font-semibold text-[#F1EEE7]">{value}</p>
    </div>
  );
}

export default function WhereWindsMeetCalculatorPage() {
  const [skill, setSkill] = useState<WwmSkill | null>(null);

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

            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              <Calculator className="h-4 w-4" />
              Where Winds Meet
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Калькулятор билдов
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9B9D9A]">
              Выберите оружие и навык — множители урона, фиксированный урон и
              разбивка по ударам подставятся автоматически из базы навыков.
            </p>
          </div>
        </section>

        <GameNavigation />

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8 flex items-start gap-3 rounded-2xl border border-[#C7A56A]/20 bg-[#C7A56A]/[0.06] p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#C7A56A]" />
              <p className="text-sm leading-6 text-[#D1D2CE]">
                Раздел в разработке: подстановка панели персонажа, еды,
                баффов и итогового расчёта урона появится позже. Сейчас
                доступна автоподстановка параметров навыка из базы{" "}
                <span className="text-[#F1EEE7]">技能表</span> — оружие,
                множители урона и разбивка по ударам.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#101518] p-6 sm:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Навык</h2>

              <WeaponSkillSelect onSelect={setSkill} />

              {skill && (
                <div className="mt-8 border-t border-white/10 pt-8">
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-[#F1EEE7]">
                      {skill.nameRu}
                      <span className="ml-3 text-sm font-normal text-[#777D7C]">
                        {skill.nameCn}
                      </span>
                    </h3>
                    {skill.version && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#9B9D9A]">
                        версия {skill.version}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatCard
                      label="Внешний множитель"
                      value={skill.extMultiplier ?? "—"}
                    />
                    <StatCard
                      label="Элементный множитель"
                      value={skill.elemMultiplier ?? "—"}
                    />
                    <StatCard
                      label="Фикс. урон"
                      value={skill.fixedDamage ?? "—"}
                    />
                    <StatCard
                      label="Анимация, сек"
                      value={skill.animationSeconds ?? "—"}
                    />
                  </div>

                  {skill.segments.length > 0 && (
                    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.15em] text-[#777D7C]">
                          <tr>
                            <th className="px-4 py-3">Удар</th>
                            <th className="px-4 py-3">Множитель</th>
                            <th className="px-4 py-3">Фикс. урон</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skill.segments.map((segment) => (
                            <tr
                              key={segment.index}
                              className="border-t border-white/5 text-[#D1D2CE]"
                            >
                              <td className="px-4 py-2.5">
                                {segment.index}
                              </td>
                              <td className="px-4 py-2.5">
                                {segment.multiplier ?? "—"}
                              </td>
                              <td className="px-4 py-2.5">
                                {segment.fixedDamage ?? "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {skill.note && (
                    <p className="mt-4 text-xs text-[#777D7C]">
                      Заметка тестировщика (CN): {skill.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
