import GuideCard from "./GuideCard";
import type { GuideArticle } from "@/data/guides";

type GuideGridProps = {
  guides: GuideArticle[];
};

export default function GuideGrid({
  guides,
}: GuideGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
}