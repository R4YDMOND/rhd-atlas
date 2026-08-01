import Link from "next/link";

export default function GameHero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#080B0D]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero/where-winds-meet-hero.png')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080B0D] via-[#080B0D]/80 to-[#080B0D]/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-transparent to-[#080B0D]/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1600px] items-end px-6 pb-16 pt-32 lg:px-10">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-3 text-sm text-[#9B9D9A]">
            <Link href="/" className="transition hover:text-[#F1EEE7]">
              RHD Hub
            </Link>

            <span>/</span>

            <span className="text-[#C7A56A]">Where Winds Meet</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight text-[#F1EEE7] sm:text-6xl lg:text-8xl">
            Where Winds
            <br />
            <span className="bg-gradient-to-r from-[#E4C88D] to-[#61C8B7] bg-clip-text text-transparent">
              Meet
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D1D2CE]">
            Исследуйте мир уся, открывайте древние тайны и создавайте свой
            собственный путь в огромном мире Where Winds Meet.
          </p>
        </div>
      </div>
    </section>
  );
}