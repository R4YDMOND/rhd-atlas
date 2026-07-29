import type { MapBlockData } from '@/lib/types/block';

interface MapBlockProps {
  block: MapBlockData;
}

export function MapBlock({ block }: MapBlockProps) {
  const { game, title, showFilters } = block.data;

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-dark-graphite/30 p-4">
      {title && (
        <h3 className="mb-3 text-lg font-semibold text-warm-white">{title}</h3>
      )}
      <div
        data-interactive-map={game}
        className="min-h-[500px] rounded-md border border-white/5 bg-deep-obsidian/50"
      >
        <p className="p-4 text-sm text-muted-gray">
          Интерактивная карта {game === 'wwm' ? 'Where Winds Meet' : 'Once Human'}
        </p>
        {showFilters && (
          <p className="px-4 text-xs text-muted-gray/60">
            Фильтры: боссы, ресурсы, телепорты, сундуки, NPC, испытания, квесты
          </p>
        )}
      </div>
    </div>
  );
}