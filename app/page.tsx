// app/page.tsx

import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import NewsSection from "@/components/home/NewsSection";
import GuidesSection from "@/components/home/GuidesSection";
import GamesSection from "@/components/home/GamesSection";
import VideoSection from "@/components/home/VideoSection";
import UpdatesSection from "@/components/home/UpdatesSection";

export default function Home() {
  return (
    <>
      <Hero />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Быстрый доступ немного перекрывает Hero */}
        <div className="relative z-20 -mt-10 mb-20">
          <QuickAccess />
        </div>

        {/* Воздушные отступы между секциями */}
        <div className="space-y-24 pb-24">
          <NewsSection />
          <GuidesSection />
          
          {/* Блок Играть сейчас (ссылки на магазины) */}
          <GamesSection />
          
          <VideoSection />
          <UpdatesSection />
        </div>
      </div>
    </>
  );
}