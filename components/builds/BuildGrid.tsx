import BuildCard from "./BuildCard";
import type { Build } from "@/data/builds";

type BuildGridProps = {
  builds: Build[];
};

export default function BuildGrid({
  builds,
}: BuildGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {builds.map((build) => (
        <BuildCard
          key={build.id}
          build={build}
        />
      ))}
    </div>
  );
}