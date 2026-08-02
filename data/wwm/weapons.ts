/**
 * Справочник оружия Where Winds Meet для калькулятора билдов.
 * Источник: WhereWindsMeet_Tuning_Tool_lv80_version.xlsx, лист «技能表» (колонка «Оружие»).
 * nameEn/nameRu — машинный перевод (официальной RU/EN локализации нет), при уточнении правьте вручную.
 */

export type WwmWeapon = {
  id: string;
  nameCn: string;
  nameEn: string;
  nameRu: string;
  skillCount: number;
};

export const wwmWeapons: WwmWeapon[] = [
  {
    id: "nine-umbrella",
    nameCn: "九伞",
    nameEn: "Nine Umbrella",
    nameRu: "Девять зонтов",
    skillCount: 25,
  },
  {
    id: "nine-sword",
    nameCn: "九剑",
    nameEn: "Nine Sword",
    nameRu: "Девять мечей",
    skillCount: 14,
  },
  {
    id: "nine-spear",
    nameCn: "九枪",
    nameEn: "Nine Spear",
    nameRu: "Девять копий",
    skillCount: 6,
  },
  {
    id: "eight-spear",
    nameCn: "八枪",
    nameEn: "Eight Spear",
    nameRu: "Восемь копий",
    skillCount: 5,
  },
  {
    id: "heavenly-craft-poison",
    nameCn: "天工毒",
    nameEn: "Heavenly Craft (Poison)",
    nameRu: "Небесное ремесло (Яд)",
    skillCount: 1,
  },
  {
    id: "heavenly-craft-fire",
    nameCn: "天工火",
    nameEn: "Heavenly Craft (Fire)",
    nameRu: "Небесное ремесло (Огонь)",
    skillCount: 1,
  },
  {
    id: "arcane-arts",
    nameCn: "奇术",
    nameEn: "Arcane Arts",
    nameRu: "Тайные искусства",
    skillCount: 36,
  },
  {
    id: "healer-umbrella",
    nameCn: "奶伞",
    nameEn: "Healer Umbrella",
    nameRu: "Зонт-целитель",
    skillCount: 1,
  },
  {
    id: "healer-fan",
    nameCn: "奶扇",
    nameEn: "Healer Fan",
    nameRu: "Веер-целитель",
    skillCount: 1,
  },
  {
    id: "nameless-inner-skill",
    nameCn: "心法",
    nameEn: "Nameless Inner Skill",
    nameRu: "Внутр. техника (Безымянный)",
    skillCount: 3,
  },
  {
    id: "nameless-sword",
    nameCn: "无名剑",
    nameEn: "Nameless Sword",
    nameRu: "Безымянный меч",
    skillCount: 6,
  },
  {
    id: "nameless-spear",
    nameCn: "无名枪",
    nameEn: "Nameless Spear",
    nameRu: "Безымянное копьё",
    skillCount: 4,
  },
  {
    id: "naraka-three-taints",
    nameCn: "泥犁三垢",
    nameEn: "Naraka Three Taints",
    nameRu: "Три скверны Нараки",
    skillCount: 22,
  },
  {
    id: "cloudwalk-whip",
    nameCn: "粟子行云",
    nameEn: "Cloudwalk Whip",
    nameRu: "Облачный хлыст",
    skillCount: 6,
  },
  {
    id: "drunken-dream-spring-outing",
    nameCn: "醉梦游春",
    nameEn: "Drunken Dream Spring Outing",
    nameRu: "Пьяная весенняя прогулка",
    skillCount: 4,
  },
  {
    id: "jun-sabre",
    nameCn: "钧-横刀",
    nameEn: "Jun - Sabre",
    nameRu: "Цзюнь — сабля",
    skillCount: 9,
  },
  {
    id: "jun-mo-blade",
    nameCn: "钧-陌刀",
    nameEn: "Jun - Mo Blade",
    nameRu: "Цзюнь — клинок Мо",
    skillCount: 6,
  },
  {
    id: "mo-blade-alas",
    nameCn: "陌刀-嗟夫",
    nameEn: "Mo Blade - Alas",
    nameRu: "Клинок Мо — Увы",
    skillCount: 7,
  },
  {
    id: "jade-fan",
    nameCn: "青扇",
    nameEn: "Jade Fan",
    nameRu: "Нефритовый веер",
    skillCount: 22,
  },
  {
    id: "twinblades",
    nameCn: "鼠鼠",
    nameEn: "Twinblades",
    nameRu: "Парные клинки",
    skillCount: 6,
  },
];

export function getWwmWeaponById(id: string): WwmWeapon | undefined {
  return wwmWeapons.find((weapon) => weapon.id === id);
}
