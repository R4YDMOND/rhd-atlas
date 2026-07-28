import { Database } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 py-20">
      <Database className="mb-4 text-zinc-500" size={48} />

      <h3 className="text-xl font-semibold text-white">
        Пока нет данных
      </h3>

      <p className="mt-2 text-zinc-500">
        Добавьте первую запись.
      </p>
    </div>
  );
}