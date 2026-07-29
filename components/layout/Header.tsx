// components/layout/Header.tsx

"use client";

import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navigation = [
  { label: "Главная", href: "/" },
  { label: "Новости", href: "/news" },
  { label: "Гайды", href: "/guides" },
  { label: "Карта", href: "/tools/map" },
  { label: "Калькулятор", href: "/tools/calculator" },
  { label: "Билды", href: "/builds" },
  { label: "Видео", href: "/video" },
  { label: "Игры", href: "/games" },
  { label: "О проекте", href: "/about" },
];

const games = [
  "Where Winds Meet",
  "Once Human",
  "The Cube",
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080B0D]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 lg:px-10">
        
        {/* Logo */}
        <a href="/" className="group flex items-center gap-3">
          <Image
            src="/branding/atlas-logo.png"
            alt="RHD ATLAS"
            width={120}
            height={40}
            className="h-auto w-auto"
            priority
          />
          <div className="hidden sm:block">
            <div className="text-[9px] uppercase tracking-[0.28em] text-[#9B9D9A]">
              Мир. Знания. Сообщество.
            </div>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[#9B9D9A] transition-colors hover:bg-white/5 hover:text-[#F1EEE7]"
            >
              {item.label}
            </a>
          ))}

          {/* Games dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsGamesOpen(!isGamesOpen)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[#9B9D9A] transition-colors hover:bg-white/5 hover:text-[#F1EEE7]"
            >
              Игры
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isGamesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isGamesOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-[#111619] p-2 shadow-2xl">
                {games.map((game) => (
                  <a
                    key={game}
                    href="#"
                    className="block rounded-lg px-3 py-3 text-sm text-[#9B9D9A] transition-colors hover:bg-white/5 hover:text-[#F1EEE7]"
                  >
                    {game}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Social links */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#"
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-[#9B9D9A] transition hover:border-[#C7A56A]/50 hover:text-[#F1EEE7]"
          >
            VK
          </a>

          <a
            href="#"
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-[#9B9D9A] transition hover:border-[#C7A56A]/50 hover:text-[#F1EEE7]"
          >
            MAX
          </a>

          <a
            href="#"
            className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-[#9B9D9A] transition hover:border-[#C7A56A]/50 hover:text-[#F1EEE7]"
          >
            Lolka
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg border border-white/10 p-2 text-[#F1EEE7] xl:hidden"
          aria-label="Открыть меню"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#080B0D] px-6 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm text-[#9B9D9A] hover:bg-white/5 hover:text-[#F1EEE7]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}