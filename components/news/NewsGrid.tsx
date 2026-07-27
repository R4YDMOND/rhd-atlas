import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/data/news";

type NewsGridProps = {
  articles: NewsArticle[];
};

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}