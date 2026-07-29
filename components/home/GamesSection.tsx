// components/home/GamesSection.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Info } from "lucide-react";

const games = [
  {
    title: "Where Winds Meet",
    description: "Откройте мир древнего Китая и искусства боевых искусств.",
    image: "/images/games/where-winds-meet.png",
    href: "/games/where-winds-meet",
    playLink: "https://adl.easebar.com/d/g/wwm/c/officialwebsite?type=pc",
    playLabel: "Скачать лаунчер",
    accent: "from-[#C7A56A]/80",
  },
  {
    title: "Once Human",
    description: "Выживание, исследование и борьба за будущее человечества.",
    image: "/images/games/once-human.png",
    href: "/games/once-human",
    playLink: "https://adl.easebar.com/d/g/oncehuman/c/gwpc",
    playLabel: "Скачать лаунчер",
    accent: "from-[#789B91]/80",
  },
  {
    title: "The Cube",
    description: "Исследуйте неизвестное и раскройте тайны загадочного мира.",
    image: "/images/games/the-cube.png",
    href: "/games/the-cube",
    playLink: "https://store.steampowered.com/app/3230430/The_CUBE/?l=russian",
    playLabel: "Страница в Steam",
    accent: "from-[#65747A]/80",
  },
];

export default function GamesSection() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              Play now
            </p>

            <h2 className="text-3xl font-semibold text-[#F1EEE7] sm:text-4xl">
              Играть сейчас
            </h2>
          </div>

          <span className="hidden text-sm text-[#9B9D9A] sm:block">
            Официальные источники
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.title}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#101518]"
            >
              <Image
                src={game.image}
                alt={game.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-[#080B0D]/35 to-transparent" />

              <div
                className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t ${game.accent} to-transparent opacity-20`}
              />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-[#F1EEE7]">
                    {game.title}
                  </h3>
                </div>

                <p className="mb-6 max-w-sm text-sm leading-6 text-[#D1D2CE]">
                  {game.description}
                </p>

                {/* Кнопки действий */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Кнопка скачивания (внешняя) */}
                  <a
                    href={game.playLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C7A56A] to-[#E4C88D] px-4 py-2.5 text-xs font-semibold text-[#080B0D] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Download className="h-4 w-4" />
                    {game.playLabel}
                  </a>

                  {/* Кнопка на наш портал (внутренняя) */}
                  <Link
                    href={game.href}
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 text-xs font-semibold text-[#F1EEE7] backdrop-blur-md transition-all duration-300 hover:border-[#2F9D91]/60"
                  >
                    <Info className="h-4 w-4 text-[#61C8B7]" />
                    Гайды и билды
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}