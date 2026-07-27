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

        <QuickAccess />

        <NewsSection />

        <GuidesSection />

        <ToolsSection />

        <GamesSection />

        <VideoSection />

        <UpdatesSection />
      </main>

      <Footer />
    </div>
  );
}