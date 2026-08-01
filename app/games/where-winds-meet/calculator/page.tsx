import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

import GameNavigation from "@/components/games/GameNavigation";
import WwmCalculator from "@/components/calculator/wwm/WwmCalculator";

export default function WhereWindsMeetCalculatorPage() {
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

          <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
            <Calculator className="h-4 w-4" />
            Where Winds Meet
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Калькулятор урона
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9B9D9A]">
            Введите панельные характеристики и множители навыка, чтобы оценить
            ожидаемый урон удара.
          </p>
        </div>
      </section>

      <GameNavigation />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <WwmCalculator />

          <p className="mt-10 max-w-3xl text-xs leading-6 text-[#777D7C]">
            Формула основана на community-верифицированных данных (игрок Violetta,
            ветка обсуждения на forum NGA). Отдельные механики («定音区», точное
            снижение урона при «擦伤») не подтверждены источником и могут отличаться
            от актуальной версии игры — расчёт стоит использовать для сравнения
            билдов между собой, а не как гарантированное игровое значение.
          </p>
        </div>
      </section>
    </>
  );
}
