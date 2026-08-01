// lib/calculator/wwm/types.ts
//
// Формула урона Where Winds Meet.
// Источник: community-верифицированная таблица механик (игрок Violetta, ветка NGA:
// https://bbs.nga.cn/read.php?tid=43152002), лист "伤害公式" файла-тюнера lv80.
// Заменяет более раннюю "provisional"-формулу из тех.спеки, которая провалила QA-аудит
// (расчётное значение 16.8k против фактических 24.1k в игре).
//
// Статус верификации по разделам см. VERIFICATION в formula.ts — не все зоны
// подтверждены с одинаковой уверенностью, слабые места явно помечены.

/** Панельные (снятые с персонажа) значения атаки и брони цели. */
export interface PanelStats {
  /** 外攻 — минимальная внешняя атака. */
  minExtAtk: number;
  /** 外攻 — максимальная внешняя атака. */
  maxExtAtk: number;
  /** 外攻防御 — защита цели от внешней атаки (0 для расчёта "в вакууме"). */
  targetExtDef: number;
  /** 本系元素攻击 — атака своей стихии. */
  ownElemAtk: number;
  /** 隐藏本系元素攻击 — скрытая атака своей стихии (бонусы, не отображаемые в панели). */
  hiddenOwnElemAtk: number;
  /** 外系元素攻击 — атака чужой стихии. */
  foreignElemAtk: number;
}

/** Множители конкретного навыка (обычно берутся из будущей базы навыков). */
export interface SkillMultipliers {
  /** 外攻倍率 — множитель внешней атаки. */
  extMultiplier: number;
  /** 固定伤害 — фиксированный урон. */
  fixedDamage: number;
  /** 本系元素倍率 — множитель урона своей стихии. */
  ownElemMultiplier: number;
  /** 外系元素倍率 — множитель урона чужой стихии. */
  foreignElemMultiplier: number;
}

/** Ставки точности/крита/affinity и связанные с ними бонусы урона. */
export interface RateStats {
  /** 其他精准 — доп. точность сверх базовых 65%. */
  bonusPrecision: number;
  /** 判定抗性 — сопротивление цели проверке попадания. */
  judgmentResistance: number;
  /** 会心率 — базовая ставка крита (панельная, уже приведённая). */
  critRate: number;
  /** 会意率 — базовая ставка affinity ("会意", особый тип попадания WWM). */
  affinityRate: number;
  /** Базовый бонус урона крита (обычно 0.5 = +50%). */
  baseCritDamage: number;
  /** Доп. бонус урона крита от экипировки/баффов. */
  critDamageBonus: number;
  /** Базовый бонус урона affinity. */
  baseAffinityDamage: number;
  /** Доп. бонус урона affinity от экипировки/баффов. */
  affinityDamageBonus: number;
  /**
   * Снижение урона при "擦伤" (骚 glancing hit — промах точности и affinity).
   * НЕ ПОДТВЕРЖДЕНО источником — по умолчанию 0 (без снижения), см. VERIFICATION.
   */
  glancingReduction: number;
}

/** Множительные "зоны" мастер-формулы, не относящиеся к рейтам попадания. */
export interface DamageZones {
  /** Сумма всех бонусов "增伤区/debuff区" (аддитивно суммируются перед применением). */
  damageBonusPercent: number;
  /** Сумма "独立区" бонусов (аддитивно суммируются перед применением, напр. "鼠鼠的泥鱼3"). */
  independentPercent: number;
  /** Список отдельных источников снижения урона цели — каждый умножается независимо. */
  damageReductions: number[];
  /** 穿透 — пробитие. */
  penetration: number;
  /** 抗性 — сопротивление цели пробитию. */
  resistance: number;
  /** 伤害加深 — доп. "углубление" урона (талант ветки оружия). */
  damageDeepenPercent: number;
}

export interface WwmCalculatorInput {
  panel: PanelStats;
  skill: SkillMultipliers;
  rates: RateStats;
  zones: DamageZones;
}

export interface WwmCalculatorOutput {
  /** Базовый урон, рассчитанный на минимальной атаке. */
  rawDamageMin: number;
  /** Базовый урон, рассчитанный на максимальной атаке (используется для affinity). */
  rawDamageMax: number;
  /** Урон при обычном попадании (без крита/affinity), на средней атаке. */
  normalDamage: number;
  /** Урон при крите. */
  critDamage: number;
  /** Урон при affinity (считается от максимальной атаки). */
  affinityDamage: number;
  /** Эффективная точность. */
  effectivePrecision: number;
  /** Эффективная ставка крита. */
  effectiveCritRate: number;
  /** Эффективная ставка affinity. */
  effectiveAffinityRate: number;
  /** Ставка "смазанного" удара (擦伤). */
  glancingRate: number;
  /** Множитель зоны пробития. */
  penetrationZone: number;
  /** Ожидаемый урон одного попадания до применения зон снижения/пробития/бонусов. */
  expectedHitDamage: number;
  /** Итоговый ожидаемый урон одного попадания со всеми зонами. */
  finalExpectedDamage: number;
}
