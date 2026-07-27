export type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  game: string;
};

export const news: NewsArticle[] = [
  {
    id: 1,
    title: "Where Winds Meet — последние новости игры",
    excerpt:
      "Все важные события, обновления и новости мира Where Winds Meet в одном месте.",
    category: "Новости",
    date: "27 июля 2026",
    image: "/images/news/news-01.png",
    game: "Where Winds Meet",
  },
  {
    id: 2,
    title: "Новое обновление и изменения игрового мира",
    excerpt:
      "Разбираем ключевые изменения, новые возможности и важные детали обновления.",
    category: "Обновление",
    date: "25 июля 2026",
    image: "/images/news/news-02.png",
    game: "Where Winds Meet",
  },
  {
    id: 3,
    title: "События и новые возможности для игроков",
    excerpt:
      "Что нового появилось в игре и на что стоит обратить внимание игрокам.",
    category: "События",
    date: "22 июля 2026",
    image: "/images/news/news-03.png",
    game: "Where Winds Meet",
  },
];