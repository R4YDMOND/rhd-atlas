import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const games = [
  {
    title: "Where Winds Meet",
    description: "Откройте мир древнего Китая и искусства боевых искусств.",
    image: "/images/games/where-winds-meet.png",
    href: "/games/where-winds-meet",
    accent: "from-[#C7A56A]/80",
  },
  {
    title: "Once Human",
    description: "Выживание, исследование и борьба за будущее человечества.",
    image: "/images/games/once-human.png",
    href: "/games/once-human",
    accent: "from-[#789B91]/80",
  },
  {
    title: "The Cube",
    description: "Исследуйте неизвестное и раскройте тайны загадочного мира.",
    image: "/images/games/the-cube.png",
    href: "/games/the-cube",
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
              Explore worlds
            </p>

            <h2 className="text-3xl font-semibold text-[#F1EEE7] sm:text-4xl">
              Исследуйте миры
            </h2>
          </div>

          <span className="hidden text-sm text-[#9B9D9A] sm:block">
            Выберите свою вселенную
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.title}
              href={game.href}
              className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#101518]"
            >
              <Image
                src={game.image}
                alt={game.title}
                fill
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

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition group-hover:border-[#C7A56A]/60">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="max-w-sm text-sm leading-6 text-[#D1D2CE]">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}