import { GripVertical, Type, Heading, Image, Video, Quote, List, Table, Calculator, Map, Minus } from 'lucide-react';
import type { BlockType } from '@/lib/types/block';

interface BlockPaletteProps {
  onAdd: (type: BlockType) => void;
}

const blockTypes: Array<{
  type: BlockType;
  label: string;
  icon: React.ElementType;
}> = [
  { type: 'heading', label: 'Заголовок', icon: Heading },
  { type: 'text', label: 'Текст', icon: Type },
  { type: 'image', label: 'Изображение', icon: Image },
  { type: 'video', label: 'Видео', icon: Video },
  { type: 'quote', label: 'Цитата', icon: Quote },
  { type: 'list', label: 'Список', icon: List },
  { type: 'table', label: 'Таблица', icon: Table },
  { type: 'calculator', label: 'Калькулятор', icon: Calculator },
  { type: 'map', label: 'Карта', icon: Map },
  { type: 'divider', label: 'Разделитель', icon: Minus },
];

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-dark-graphite/50 p-3">
      {blockTypes.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => onAdd(type)}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-deep-obsidian/50 px-3 py-1.5 text-sm text-warm-white/80 transition-colors hover:border-antique-gold/30 hover:text-warm-white"
        >
          <Icon className="h-4 w-4 text-jade-green" />
          {label}
        </button>
      ))}
    </div>
  );
}