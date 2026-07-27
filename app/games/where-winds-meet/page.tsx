import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import GameHero from "@/components/games/GameHero";
import GameNavigation from "@/components/games/GameNavigation";
import GameOverview from "@/components/games/GameOverview";

export default function WhereWindsMeetPage() {
  return (
    <div className="min-h-screen bg-[#080B0D] text-[#F1EEE7]">
      <Header />

      <main>
        <GameHero />

        <GameNavigation />

        <GameOverview />
      </main>

      <Footer />
    </div>
  );
}