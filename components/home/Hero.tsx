import { ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#080B0D]">
      {/* Hero Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-[65%_center] bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero/where-winds-meet-hero.png')",
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080B0D] via-[#080B0D]/75 to-[#080B0D]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-transparent to-[#080B0D]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(47,157,145,0.10),transparent_35%)]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1600px] items-center px-6 pt-[72px] lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-[#C7A56A]" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#C7A56A]">
              RHD Atlas
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-[#F1EEE7] sm:text-6xl lg:text-8xl">
            Атлас игровых
            <br />
            <span className="bg-gradient-to-r from-[#E4C88D] via-[#C7A56A] to-[#61C8B7] bg-clip-text text-transparent">
              вселенных
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#D1D2CE]">
            Новости, гайды, билды и инструменты для ваших любимых игр. Исследуйте миры, находите знания и создавайте свои истории вместе с сообществом.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/games/where-winds-meet"
              className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#C7A56A] to-[#E4C88D] px-6 py-3.5 text-sm font-semibold text-[#080B0D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(199,165,106,0.25)]"
            >
              Исследовать мир
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="/guides"
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-6 py-3.5 text-sm font-semibold text-[#F1EEE7] backdrop-blur-md transition-all duration-300 hover:border-[#2F9D91]/60 hover:bg-black/35"
            >
              <BookOpen className="h-4 w-4 text-[#61C8B7]" />
              Смотреть гайды
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}