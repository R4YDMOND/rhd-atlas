"use client";

import { useMemo, useState } from "react";
import { Info, Plus, RotateCcw, Sparkles, Swords, Target, Trash2, Wand2 } from "lucide-react";

import {
  calculateWwmBuild,
  computeStatPriority,
  DEFAULT_WWM_INPUT,
  EXAMPLE_WWM_INPUT,
} from "@/lib/calculator/wwm/formula";
import type { WwmCalculatorInput } from "@/lib/calculator/wwm/types";
import CalcField from "./CalcField";
import CalcSection from "./CalcSection";

/** Поле ввода, хранящее долю (0..1), но показывающее пользователю проценты. */
function PercentField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <CalcField
      label={label}
      value={Math.round(value * 1000) / 10}
      onChange={(percent) => onChange(percent / 100)}
      suffix="%"
      hint={hint}
      step={0.1}
    />
  );
}

const TABS = [
  { id: "panel", label: "Панель", icon: Swords },
  { id: "skill", label: "Навык", icon: Wand2 },
  { id: "rates", label: "Точность и крит", icon: Target },
  { id: "zones", label: "Зоны урона", icon: Sparkles },
] as const;

type TabId = (typeof TABS)[number]["id"];

const HIT_TYPE_COLORS = {
  affinity: "#61C8B7",
  crit: "#C7A56A",
  normal: "#D1D2CE",
  glancing: "#4A4F52",
};

export default function WwmCalculator() {
  const [input, setInput] = useState<WwmCalculatorInput>(DEFAULT_WWM_INPUT);
  const [activeTab, setActiveTab] = useState<TabId>("panel");

  const result = useMemo(() => calculateWwmBuild(input), [input]);
  const statPriority = useMemo(() => computeStatPriority(input).slice(0, 5), [input]);

  const hasBuild = result.finalExpectedDamage > 0;

  const updatePanel = (patch: Partial<WwmCalculatorInput["panel"]>) =>
    setInput((prev) => ({ ...prev, panel: { ...prev.panel, ...patch } }));

  const updateSkill = (patch: Partial<WwmCalculatorInput["skill"]>) =>
    setInput((prev) => ({ ...prev, skill: { ...prev.skill, ...patch } }));

  const updateRates = (patch: Partial<WwmCalculatorInput["rates"]>) =>
    setInput((prev) => ({ ...prev, rates: { ...prev.rates, ...patch } }));

  const updateZones = (patch: Partial<WwmCalculatorInput["zones"]>) =>
    setInput((prev) => ({ ...prev, zones: { ...prev.zones, ...patch } }));

  const addReduction = () =>
    updateZones({ damageReductions: [...input.zones.damageReductions, 0] });

  const removeReduction = (index: number) =>
    updateZones({
      damageReductions: input.zones.damageReductions.filter((_, i) => i !== index),
    });

  const setReduction = (index: number, value: number) =>
    updateZones({
      damageReductions: input.zones.damageReductions.map((r, i) =>
        i === index ? value / 100 : r
      ),
    });

  const normalRate = Math.max(
    0,
    1 - result.effectiveCritRate - result.effectiveAffinityRate - result.glancingRate
  );

  const hitDistribution = [
    { key: "affinity", label: "Affinity", value: result.effectiveAffinityRate },
    { key: "crit", label: "Крит", value: result.effectiveCritRate },
    { key: "normal", label: "Обычный", value: normalRate },
    { key: "glancing", label: "Смазанный", value: result.glancingRate },
  ] as const;

  const maxGain = Math.max(1, ...statPriority.map((s) => Math.abs(s.gainPercent)));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* Форма ввода */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-[#0B1012] p-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#C7A56A] text-[#080B0D]"
                      : "text-[#9B9D9A] hover:text-[#F1EEE7]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInput(EXAMPLE_WWM_INPUT)}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#9B9D9A] transition hover:border-[#61C8B7]/50 hover:text-[#61C8B7]"
            >
              Пример
            </button>

            <button
              type="button"
              onClick={() => setInput(DEFAULT_WWM_INPUT)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#9B9D9A] transition hover:border-[#D88B8B]/50 hover:text-[#D88B8B]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Сбросить
            </button>
          </div>
        </div>

        {activeTab === "panel" && (
          <CalcSection title="Панель атаки">
            <CalcField
              label="Мин. внешняя атака"
              value={input.panel.minExtAtk}
              onChange={(v) => updatePanel({ minExtAtk: v })}
            />
            <CalcField
              label="Макс. внешняя атака"
              value={input.panel.maxExtAtk}
              onChange={(v) => updatePanel({ maxExtAtk: v })}
            />
            <CalcField
              label="Атака своей стихии"
              value={input.panel.ownElemAtk}
              onChange={(v) => updatePanel({ ownElemAtk: v })}
            />
            <CalcField
              label="Скрытая атака своей стихии"
              value={input.panel.hiddenOwnElemAtk}
              onChange={(v) => updatePanel({ hiddenOwnElemAtk: v })}
              hint="Бонусы, не отображаемые в панели персонажа (еда, скрытые таланты)"
            />
            <CalcField
              label="Атака чужой стихии"
              value={input.panel.foreignElemAtk}
              onChange={(v) => updatePanel({ foreignElemAtk: v })}
            />
            <CalcField
              label="Защита цели"
              value={input.panel.targetExtDef}
              onChange={(v) => updatePanel({ targetExtDef: v })}
              hint="0 — расчёт «в вакууме», без учёта брони цели"
            />
          </CalcSection>
        )}

        {activeTab === "skill" && (
          <CalcSection title="Множители навыка">
            <CalcField
              label="Множитель внешней атаки"
              value={input.skill.extMultiplier}
              step={0.001}
              onChange={(v) => updateSkill({ extMultiplier: v })}
            />
            <CalcField
              label="Фиксированный урон"
              value={input.skill.fixedDamage}
              onChange={(v) => updateSkill({ fixedDamage: v })}
            />
            <CalcField
              label="Множитель своей стихии"
              value={input.skill.ownElemMultiplier}
              step={0.001}
              onChange={(v) => updateSkill({ ownElemMultiplier: v })}
            />
            <CalcField
              label="Множитель чужой стихии"
              value={input.skill.foreignElemMultiplier}
              step={0.001}
              onChange={(v) => updateSkill({ foreignElemMultiplier: v })}
            />
          </CalcSection>
        )}

        {activeTab === "rates" && (
          <CalcSection title="Точность, крит, affinity (会意)">
            <PercentField
              label="Доп. точность"
              value={input.rates.bonusPrecision}
              onChange={(v) => updateRates({ bonusPrecision: v })}
              hint="«其他精准» — точность сверх базовых 65%"
            />
            <PercentField
              label="Сопротивление цели проверке"
              value={input.rates.judgmentResistance}
              onChange={(v) => updateRates({ judgmentResistance: v })}
            />
            <PercentField
              label="Ставка крита"
              value={input.rates.critRate}
              onChange={(v) => updateRates({ critRate: v })}
            />
            <PercentField
              label="Ставка affinity (会意)"
              value={input.rates.affinityRate}
              onChange={(v) => updateRates({ affinityRate: v })}
            />
            <PercentField
              label="Бонус урона крита (доп.)"
              value={input.rates.critDamageBonus}
              onChange={(v) => updateRates({ critDamageBonus: v })}
              hint="Базовые +50% уже учтены отдельно"
            />
            <PercentField
              label="Бонус урона affinity (доп.)"
              value={input.rates.affinityDamageBonus}
              onChange={(v) => updateRates({ affinityDamageBonus: v })}
            />
          </CalcSection>
        )}

        {activeTab === "zones" && (
          <CalcSection title="Зоны урона">
            <PercentField
              label="Увеличение урона (сумма)"
              value={input.zones.damageBonusPercent}
              onChange={(v) => updateZones({ damageBonusPercent: v })}
              hint="Сумма всех бонусов «增伤区/debuff区»"
            />
            <PercentField
              label="Независимая зона (сумма)"
              value={input.zones.independentPercent}
              onChange={(v) => updateZones({ independentPercent: v })}
            />
            <PercentField
              label="Пробитие"
              value={input.zones.penetration / 100}
              onChange={(v) => updateZones({ penetration: v * 100 })}
            />
            <PercentField
              label="Сопротивление цели"
              value={input.zones.resistance / 100}
              onChange={(v) => updateZones({ resistance: v * 100 })}
            />
            <PercentField
              label="Углубление урона"
              value={input.zones.damageDeepenPercent}
              onChange={(v) => updateZones({ damageDeepenPercent: v })}
            />

            <div className="sm:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#9B9D9A]">
                  Снижение урона (каждый источник умножается независимо)
                </span>

                <button
                  type="button"
                  onClick={addReduction}
                  className="flex items-center gap-1 text-xs text-[#61C8B7] transition hover:text-[#8BDDCB]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Добавить
                </button>
              </div>

              <div className="space-y-2">
                {input.zones.damageReductions.map((reduction, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <CalcField
                        label={`Источник ${index + 1}`}
                        value={Math.round(reduction * 1000) / 10}
                        onChange={(v) => setReduction(index, v)}
                        suffix="%"
                        step={0.1}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeReduction(index)}
                      className="mt-5 rounded-lg border border-white/10 p-2 text-[#9B9D9A] transition hover:border-[#D88B8B]/50 hover:text-[#D88B8B]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {input.zones.damageReductions.length === 0 && (
                  <p className="text-xs text-[#777D7C]">Источников снижения урона нет.</p>
                )}
              </div>
            </div>
          </CalcSection>
        )}
      </div>

      {/* Результат */}
      <div className="h-fit space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-[#C7A56A]/30 bg-gradient-to-b from-[#C7A56A]/10 to-transparent p-6">
          <p className="text-xs uppercase tracking-wide text-[#9B9D9A]">
            Ожидаемый урон удара
          </p>

          <p className="mt-2 text-4xl font-bold text-[#F1EEE7]">
            {Math.round(result.finalExpectedDamage).toLocaleString("ru-RU")}
          </p>

          <p className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-[#9B9D9A]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Расчёт по community-формуле (источник — внизу страницы). Используйте для
            сравнения билдов между собой, а не как гарантированное игровое значение.
          </p>
        </div>

        {hasBuild && (
          <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
            <h3 className="mb-4 text-sm font-semibold text-[#F1EEE7]">
              Распределение попаданий
            </h3>

            <div className="flex h-3 overflow-hidden rounded-full bg-black/30">
              {hitDistribution.map((segment) => (
                <div
                  key={segment.key}
                  style={{
                    width: `${Math.max(0, segment.value) * 100}%`,
                    backgroundColor: HIT_TYPE_COLORS[segment.key],
                  }}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {hitDistribution.map((segment) => (
                <div key={segment.key} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: HIT_TYPE_COLORS[segment.key] }}
                  />
                  <span className="text-[#9B9D9A]">{segment.label}</span>
                  <span className="ml-auto text-[#D1D2CE]">
                    {(segment.value * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {statPriority.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
            <h3 className="mb-1 text-sm font-semibold text-[#F1EEE7]">
              Приоритет прокачки
            </h3>
            <p className="mb-4 text-xs text-[#777D7C]">
              Прирост урона от небольшого увеличения каждого стата
            </p>

            <div className="space-y-3">
              {statPriority.map((entry) => (
                <div key={entry.key}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-[#D1D2CE]">{entry.label}</span>
                    <span className="text-[#61C8B7]">
                      +{entry.gainPercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/30">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C7A56A] to-[#61C8B7]"
                      style={{
                        width: `${Math.max(0, (entry.gainPercent / maxGain) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="rounded-2xl border border-white/10 bg-[#101518] p-6">
          <summary className="cursor-pointer text-sm font-semibold text-[#F1EEE7]">
            Подробная разбивка
          </summary>

          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Базовый урон (мин.)", result.rawDamageMin],
              ["Базовый урон (макс.)", result.rawDamageMax],
              ["Урон обычного попадания", result.normalDamage],
              ["Урон крита", result.critDamage],
              ["Урон affinity", result.affinityDamage],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between">
                <dt className="text-[#9B9D9A]">{label}</dt>
                <dd className="text-[#D1D2CE]">
                  {Math.round(value as number).toLocaleString("ru-RU")}
                </dd>
              </div>
            ))}

            <div className="my-2 border-t border-white/10" />

            {[
              ["Точность", result.effectivePrecision],
              ["Эфф. ставка крита", result.effectiveCritRate],
              ["Эфф. ставка affinity", result.effectiveAffinityRate],
              ["Ставка «擦伤»", result.glancingRate],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between">
                <dt className="text-[#9B9D9A]">{label}</dt>
                <dd className="text-[#D1D2CE]">
                  {((value as number) * 100).toFixed(1)}%
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </div>
  );
}
