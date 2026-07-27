"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  Swords,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameNavigation from "@/components/games/GameNavigation";
import BuildGrid from "@/components/builds/BuildGrid";
import { builds } from "@/data/builds";

const filters = [
  "Все",
  "PvE",
  "PvP",
  "Гибрид",
];

export default function WhereWindsMeetBuildsPage() {
  const [activeFilter, setActiveFilter] =
    useState("Все");

  const filteredBuilds =
    activeFilter === "Все"
      ? builds
      : builds.filter(
          (build) => build.style === activeFilter
        );

  return (
    <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
      <Header />

      <main>
        <section className="border-b border-white/10 bg-[#0B1012] px-6 pb-16 pt-36 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <Link
              href="/games/where-winds-meet"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#9B9D9A] transition hover:text-[#F1EEE7]"
            >
              <ArrowLeft className="h-4 w-4" />
              Where Winds Meet
            </Link>

            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              <Swords className="h-4 w-4" />
              Where Winds Meet
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Билды
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9B9D9A]">
              Готовые сборки персонажей для PvE, PvP и различных стилей игры.
            </p>
          </div>
        </section>

        <GameNavigation />

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Все билды
                </h2>

                <p className="mt-2 text-sm text-[#777D7C]">
                  Найдено: {filteredBuilds.length}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-2 flex items-center gap-2 text-sm text-[#777D7C]">
                  <Filter className="h-4 w-4" />
                  Фильтр
                </div>

                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                    className={`rounded-xl border px-4 py-2.5 text-sm transition ${
                      activeFilter === filter
                        ? "border-[#C7A56A]/50 bg-[#C7A56A]/10 text-[#E4C88D]"
                        : "border-white/10 bg-white/[0.03] text-[#9B9D9A] hover:border-white/20 hover:text-[#F1EEE7]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <BuildGrid builds={filteredBuilds} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}