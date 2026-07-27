"use client";

import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-3.5 text-zinc-500"
        size={18}
      />

      <input
        placeholder="Поиск..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none"
      />
    </div>
  );
}