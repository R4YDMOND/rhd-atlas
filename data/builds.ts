export type Build = {
  id: number;
  title: string;
  description: string;
  weapon: string;
  style: "PvE" | "PvP" | "Гибрид";
  difficulty: "Начинающий" | "Средний" | "Продвинутый";
  role: string;
  updatedAt: string;
  game: string;
};

export const builds: Build[] = [
  {
    id: 1,
    title: "Мечник — универсальный PvE-билд",
    description:
      "Сбалансированный билд для исследования мира, прохождения заданий и сражений с обычными противниками.",
    weapon: "Меч",
    style: "PvE",
    difficulty: "Начинающий",
    role: "Универсальный",
    updatedAt: "27 июля 2026",
    game: "Where Winds Meet",
  },
  {
    id: 2,
    title: "Дуал-блейды — быстрый PvP-билд",
    description:
      "Агрессивный билд для быстрых атак, мобильности и сражений против других игроков.",
    weapon: "Парные клинки",
    style: "PvP",
    difficulty: "Продвинутый",
    role: "Атакующий",
    updatedAt: "25 июля 2026",
    game: "Where Winds Meet",
  },
  {
    id: 3,
    title: "Меч и копьё — гибридный билд",
    description:
      "Гибридный вариант для игроков, которым нужен баланс между уроном, выживаемостью и контролем.",
    weapon: "Меч + Копьё",
    style: "Гибрид",
    difficulty: "Средний",
    role: "Гибридный",
    updatedAt: "22 июля 2026",
    game: "Where Winds Meet",
  },
];