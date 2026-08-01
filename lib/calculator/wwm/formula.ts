// lib/calculator/wwm/formula.ts
//
// Реализация мастер-формулы урона Where Winds Meet.
// Источник: см. lib/calculator/wwm/types.ts.
//
// VERIFICATION (статус по разделам исходной таблицы):
//   - Базовый урон, крит, affinity, снижение урона, пробитие, рейты попадания — CONFIRMED.
//   - "独立区" (независимая зона), "伤害加深" (углубление урона) — CONFIRMED как факторы,
//     но конкретный порядок применения относительно других зон не уточнён в источнике —
//     применяются последними, как в тексте мастер-формулы.
//   - "定音区" — упомянута в мастер-формуле, но не описана нигде в таблице.
//     Природа эффекта не установлена → зафиксирована как множитель 1 (без эффекта).
//     Требует уточнения при появлении новых данных.
//   - Снижение урона при "擦伤" (smeared/glancing hit) — величина снижения не указана
//     в источнике → по умолчанию 0. Настраивается через rates.glancingReduction.

import type {
  DamageZones,
  PanelStats,
  RateStats,
  SkillMultipliers,
  WwmCalculatorInput,
  WwmCalculatorOutput,
} from "./types";

/** 原始伤害 — базовый урон на заданной внешней атаке. */
export function calcRawDamage(
  extAtk: number,
  panel: PanelStats,
  skill: SkillMultipliers
): number {
  return (
    (extAtk - panel.targetExtDef) * skill.extMultiplier +
    skill.fixedDamage +
    (panel.ownElemAtk + panel.hiddenOwnElemAtk) * skill.ownElemMultiplier +
    panel.foreignElemAtk * skill.foreignElemMultiplier
  );
}

/** 会心伤害 — урон при крите. */
export function calcCritDamage(rawDamage: number, rates: RateStats): number {
  return rawDamage * (1 + rates.baseCritDamage + rates.critDamageBonus);
}

/** 会意伤害 — урон при affinity (считается от урона на максимальной атаке). */
export function calcAffinityDamage(rawDamageMax: number, rates: RateStats): number {
  return rawDamageMax * (1 + rates.baseAffinityDamage + rates.affinityDamageBonus);
}

/** 精准 — эффективная точность. */
export function calcEffectivePrecision(rates: RateStats): number {
  return 0.65 + rates.bonusPrecision / (1 + rates.judgmentResistance);
}

/** Эффективные ставки крита / affinity / "смазанного" удара. */
export function calcHitRates(rates: RateStats) {
  const precision = calcEffectivePrecision(rates);

  // 实际会意率 = 会意率 (не зависит от точности — см. источник).
  const effectiveAffinityRate = rates.affinityRate;

  const critPlusAffinity = rates.critRate + rates.affinityRate;

  // 当会心+会意＞100%时，会意挤会心: 实际会心 = 精准 *（1 − 会意）
  const effectiveCritRate =
    critPlusAffinity > 1
      ? precision * (1 - rates.affinityRate)
      : precision * rates.critRate;

  // 擦伤率 = （1 − 精准率）*（1 − 会意率）
  const glancingRate = (1 - precision) * (1 - rates.affinityRate);

  return { precision, effectiveCritRate, effectiveAffinityRate, glancingRate };
}

/** 穿透区 = （穿透−抗性）/ 200, а если разница положительна — / 100. */
export function calcPenetrationZone(penetration: number, resistance: number): number {
  const diff = penetration - resistance;
  return diff > 0 ? diff / 100 : diff / 200;
}

/** 减伤区 = произведение (1 − снижениеN) по всем независимым источникам снижения урона. */
export function calcDamageReductionZone(damageReductions: number[]): number {
  return damageReductions.reduce((acc, reduction) => acc * (1 - reduction), 1);
}

/**
 * Главный расчёт: ожидаемый урон одного попадания с учётом вероятностей
 * крита / affinity / "смазанного" удара, и применением всех множительных зон.
 */
export function calculateWwmBuild(input: WwmCalculatorInput): WwmCalculatorOutput {
  const { panel, skill, rates, zones } = input;

  const rawDamageMin = calcRawDamage(panel.minExtAtk, panel, skill);
  const rawDamageMax = calcRawDamage(panel.maxExtAtk, panel, skill);
  const rawDamageAvg = (rawDamageMin + rawDamageMax) / 2;

  const normalDamage = rawDamageAvg;
  const critDamage = calcCritDamage(rawDamageAvg, rates);
  const affinityDamage = calcAffinityDamage(rawDamageMax, rates);

  const { precision, effectiveCritRate, effectiveAffinityRate, glancingRate } =
    calcHitRates(rates);

  const glancingDamage = rawDamageAvg * (1 - rates.glancingReduction);

  const normalRate = Math.max(
    0,
    1 - effectiveCritRate - effectiveAffinityRate - glancingRate
  );

  // Ожидание по типам попадания (affinity не зависит от точности, крит и обычный —
  // делят между собой оставшуюся вероятность точных попаданий).
  const expectedHitDamage =
    effectiveAffinityRate * affinityDamage +
    effectiveCritRate * critDamage +
    normalRate * normalDamage +
    glancingRate * glancingDamage;

  const penetrationZone = calcPenetrationZone(zones.penetration, zones.resistance);
  const damageReductionZone = calcDamageReductionZone(zones.damageReductions);

  const finalExpectedDamage =
    expectedHitDamage *
    (1 + zones.damageBonusPercent) *
    (1 + zones.independentPercent) *
    damageReductionZone *
    (1 + penetrationZone) *
    (1 + zones.damageDeepenPercent);

  return {
    rawDamageMin,
    rawDamageMax,
    normalDamage,
    critDamage,
    affinityDamage,
    effectivePrecision: precision,
    effectiveCritRate,
    effectiveAffinityRate,
    glancingRate,
    penetrationZone,
    expectedHitDamage,
    finalExpectedDamage,
  };
}

export const DEFAULT_WWM_INPUT: WwmCalculatorInput = {
  panel: {
    minExtAtk: 0,
    maxExtAtk: 0,
    targetExtDef: 0,
    ownElemAtk: 0,
    hiddenOwnElemAtk: 0,
    foreignElemAtk: 0,
  },
  skill: {
    extMultiplier: 1,
    fixedDamage: 0,
    ownElemMultiplier: 0,
    foreignElemMultiplier: 0,
  },
  rates: {
    bonusPrecision: 0,
    judgmentResistance: 0,
    critRate: 0,
    affinityRate: 0,
    baseCritDamage: 0.5,
    critDamageBonus: 0,
    baseAffinityDamage: 0,
    affinityDamageBonus: 0,
    glancingReduction: 0,
  },
  zones: {
    damageBonusPercent: 0,
    independentPercent: 0,
    damageReductions: [],
    penetration: 0,
    resistance: 0,
    damageDeepenPercent: 0,
  },
};

export type { DamageZones };
