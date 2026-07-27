import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Панель управления
        </h2>

        <p className="text-sm text-zinc-400">
          Добро пожаловать в систему управления RHD Atlas
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-zinc-500"
          />

          <input
            placeholder="Поиск..."
            className="pl-10 pr-4 h-11 w-72 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none"
          />
        </div>

        <button className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}