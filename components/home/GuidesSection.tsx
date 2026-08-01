// components/home/GuidesSection.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import GuideGrid from "@/components/guides/GuideGrid";
import { guides } from "@/data/guides";

export default function GuidesSection() {
  const latestGuides = guides.slice(0, 3);

  return (
    <section className="px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#61C8B7]">
              Latest guides
            </p>

            <h2 className="text-3xl font-semibold text-[#F1EEE7] sm:text-4xl">
              Последние гайды
            </h2>
          </div>

          <Link
            href="/games/where-winds-meet/guides"
            className="hidden items-center gap-2 text-sm text-[#61C8B7] sm:flex"
          >
            Все гайды
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <GuideGrid guides={latestGuides} />
      </div>
    </section>
  );
}
