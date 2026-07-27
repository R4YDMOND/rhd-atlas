import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#61C8B7]">
            Watch
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Последние видео
          </h2>
        </div>

        <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#10191A] to-[#080B0D]">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#61C8B7]/40 bg-[#61C8B7]/10">
              <Play className="ml-1 h-8 w-8 text-[#61C8B7]" />
            </div>

            <h3 className="mt-6 text-xl font-medium">
              Видео появятся здесь
            </h3>

            <p className="mt-2 text-sm text-[#9B9D9A]">
              В будущем здесь будет встроенный видеоплеер.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}