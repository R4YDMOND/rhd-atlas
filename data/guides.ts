export type GuideArticle = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  difficulty: "Начинающий" | "Средний" | "Продвинутый";
  version: string;
  date: string;
  image: string;
  game: string;
};

export const guides: GuideArticle[] = [
  {
    id: 1,
    title: "Гайд для новичков: с чего начать в Where Winds Meet",
    excerpt:
      "Основные механики, исследование мира, первые задания и полезные советы для начинающих игроков.",
    category: "Для новичков",
    difficulty: "Начинающий",
    version: "1.0",
    date: "27 июля 2026",
    image: "/images/guides/guide-01.png",
    game: "Where Winds Meet",
  },
  {
    id: 2,
    title: "Лучшие советы по исследованию мира",
    excerpt:
      "Разбираем исследование локаций, поиск секретов, путешествия и важные точки интереса.",
    category: "Исследование",
    difficulty: "Средний",
    version: "1.0",
    date: "25 июля 2026",
    image: "/images/guides/guide-02.png",
    game: "Where Winds Meet",
  },
  {
    id: 3,
    title: "Как создать эффективный билд персонажа",
    excerpt:
      "Основы создания билда, выбор оружия, навыков и характеристик для эффективной игры.",
    category: "Билды",
    difficulty: "Продвинутый",
    version: "1.0",
    date: "22 июля 2026",
    image: "/images/guides/guide-03.png",
    game: "Where Winds Meet",
  },
];