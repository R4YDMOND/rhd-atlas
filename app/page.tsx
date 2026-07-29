// app/page.tsx

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import NewsSection from "@/components/home/NewsSection";
import GuidesSection from "@/components/home/GuidesSection";
import ToolsSection from "@/components/home/ToolsSection";
import GamesSection from "@/components/home/GamesSection";
import VideoSection from "@/components/home/VideoSection";
import UpdatesSection from "@/components/home/UpdatesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
      <Header />

      <main>
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
            <ToolsSection />
            <GamesSection />
            <VideoSection />
            <UpdatesSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}