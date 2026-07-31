'use client';

import { useState } from 'react';
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Type,
  Heading as HeadingIcon,
  Image as ImageIcon,
  Video,
  Quote,
  List,
  Table as TableIcon,
  Calculator,
  Map,
  Minus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/forms/Textarea';
import { Select } from '@/components/forms/Select';
import { Switch } from '@/components/forms/Switch';
import type { Block, BlockType } from '@/lib/types/block';

interface BlockItemProps {
  block: Block;
  index: number;
  total: number;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

const blockIcons: Record<BlockType, React.ElementType> = {
  text: Type,
  heading: HeadingIcon,
  image: ImageIcon,
  video: Video,
  quote: Quote,
  list: List,
  table: TableIcon,
  calculator: Calculator,
  map: Map,
  divider: Minus,
};

const blockLabels: Record<BlockType, string> = {
  text: 'Текст',
  heading: 'Заголовок',
  image: 'Изображение',
  video: 'Видео',
  quote: 'Цитата',
  list: 'Список',
  table: 'Таблица',
  calculator: 'Калькулятор',
  map: 'Карта',
  divider: 'Разделитель',
};

export function BlockItem({
  block,
  index,
  total,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
}: BlockItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = blockIcons[block.type];

  return (
    <div className="rounded-lg border border-white/10 bg-dark-graphite/40">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
        <GripVertical className="h-4 w-4 cursor-grab text-muted-gray/50" />
        <Icon className="h-4 w-4 text-jade-green" />
        <span className="flex-1 text-sm font-medium text-warm-white">
          {blockLabels[block.type]}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(block.id, 'up')}
            disabled={index === 0}
            className="rounded p-1 text-muted-gray hover:text-warm-white disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => onMove(block.id, 'down')}
            disabled={index === total - 1}
            className="rounded p-1 text-muted-gray hover:text-warm-white disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDuplicate(block.id)}
            className="rounded p-1 text-muted-gray hover:text-warm-white"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="rounded p-1 text-muted-gray hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Editor body */}
      {isExpanded && block.type !== 'divider' && (
        <div className="space-y-3 p-3">
          {block.type === 'text' && (
            <>
              <Textarea
                label="Содержание"
                value={block.data.content}
                onChange={(v) => onUpdate(block.id, { content: v })}
                rows={4}
              />
              <Select
                label="Выравнивание"
                value={block.data.alignment ?? 'left'}
                onChange={(v) => onUpdate(block.id, { alignment: v })}
                options={[
                  { value: 'left', label: 'По левому краю' },
                  { value: 'center', label: 'По центру' },
                  { value: 'right', label: 'По правому краю' },
                ]}
              />
            </>
          )}

          {block.type === 'heading' && (
            <>
              <Input
                label="Текст заголовка"
                value={block.data.content}
                onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              />
              <Select
                label="Уровень"
                value={String(block.data.level)}
                onChange={(v) => onUpdate(block.id, { level: Number(v) as 1 | 2 | 3 | 4 })}
                options={[
                  { value: '1', label: 'H1' },
                  { value: '2', label: 'H2' },
                  { value: '3', label: 'H3' },
                  { value: '4', label: 'H4' },
                ]}
              />
            </>
          )}

          {block.type === 'image' && (
            <>
              <Input
                label="URL изображения"
                value={block.data.src}
                onChange={(e) => onUpdate(block.id, { src: e.target.value })}
              />
              <Input
                label="Alt текст"
                value={block.data.alt}
                onChange={(e) => onUpdate(block.id, { alt: e.target.value })}
              />
              <Input
                label="Подпись (необязательно)"
                value={block.data.caption ?? ''}
                onChange={(e) => onUpdate(block.id, { caption: e.target.value })}
              />
              <Select
                label="Размер"
                value={block.data.width ?? 'full'}
                onChange={(v) => onUpdate(block.id, { width: v })}
                options={[
                  { value: 'small', label: 'Маленький' },
                  { value: 'medium', label: 'Средний' },
                  { value: 'large', label: 'Большой' },
                  { value: 'full', label: 'На всю ширину' },
                ]}
              />
            </>
          )}

          {block.type === 'video' && (
            <>
              <Select
                label="Провайдер"
                value={block.data.provider}
                onChange={(v) => onUpdate(block.id, { provider: v as 'vk' | 'youtube' })}
                options={[
                  { value: 'vk', label: 'VK Видео' },
                  { value: 'youtube', label: 'YouTube' },
                ]}
              />
              <Input
                label="ID видео"
                value={block.data.videoId}
                onChange={(e) => onUpdate(block.id, { videoId: e.target.value })}
                placeholder={block.data.provider === 'vk' ? 'owner_id_video_id' : 'dQw4w9WgXcQ'}
              />
              <Input
                label="Подпись (необязательно)"
                value={block.data.caption ?? ''}
                onChange={(e) => onUpdate(block.id, { caption: e.target.value })}
              />
            </>
          )}

          {block.type === 'quote' && (
            <>
              <Textarea
                label="Текст цитаты"
                value={block.data.content}
                onChange={(v) => onUpdate(block.id, { content: v })}
                rows={3}
              />
              <Input
                label="Автор (необязательно)"
                value={block.data.author ?? ''}
                onChange={(e) => onUpdate(block.id, { author: e.target.value })}
              />
              <Input
                label="Источник (необязательно)"
                value={block.data.source ?? ''}
                onChange={(e) => onUpdate(block.id, { source: e.target.value })}
              />
            </>
          )}

          {block.type === 'list' && (
            <>
              <Textarea
                label="Элементы (по одному на строку)"
                value={block.data.items.join('\n')}
                onChange={(v) => onUpdate(block.id, { items: v.split('\n').filter(Boolean) })}
                rows={5}
              />
              <Switch
                label="Нумерованный список"
                checked={block.data.ordered}
                onChange={(v) => onUpdate(block.id, { ordered: v })}
              />
            </>
          )}

          {block.type === 'table' && (
            <>
              <Input
                label="Заголовки (через запятую)"
                value={block.data.headers.join(', ')}
                onChange={(e) =>
                  onUpdate(block.id, {
                    headers: e.target.value.split(',').map((h) => h.trim()).filter(Boolean),
                  })
                }
              />
              <Textarea
                label="Строки (ячейки через |, строки через перенос)"
                value={block.data.rows.map((r) => r.join(' | ')).join('\n')}
                onChange={(v) =>
                  onUpdate(block.id, {
                    rows: v.split('\n').filter(Boolean).map((row) =>
                      row.split('|').map((cell) => cell.trim())
                    ),
                  })
                }
                rows={5}
              />
              <Input
                label="Подпись таблицы (необязательно)"
                value={block.data.caption ?? ''}
                onChange={(e) => onUpdate(block.id, { caption: e.target.value })}
              />
            </>
          )}

          {block.type === 'calculator' && (
            <>
              <Select
                label="Игра"
                value={block.data.game}
                onChange={(v) => onUpdate(block.id, { game: v as 'wwm' | 'once-human' })}
                options={[
                  { value: 'wwm', label: 'Where Winds Meet' },
                  { value: 'once-human', label: 'Once Human' },
                ]}
              />
              <Input
                label="ID конфигурации"
                value={block.data.configId}
                onChange={(e) => onUpdate(block.id, { configId: e.target.value })}
              />
              <Input
                label="Заголовок (необязательно)"
                value={block.data.title ?? ''}
                onChange={(e) => onUpdate(block.id, { title: e.target.value })}
              />
            </>
          )}

          {block.type === 'map' && (
            <>
              <Select
                label="Игра"
                value={block.data.game}
                onChange={(v) => onUpdate(block.id, { game: v as 'wwm' | 'once-human' })}
                options={[
                  { value: 'wwm', label: 'Where Winds Meet' },
                  { value: 'once-human', label: 'Once Human' },
                ]}
              />
              <Input
                label="Заголовок (необязательно)"
                value={block.data.title ?? ''}
                onChange={(e) => onUpdate(block.id, { title: e.target.value })}
              />
              <Switch
                label="Показать фильтры"
                checked={block.data.showFilters}
                onChange={(v) => onUpdate(block.id, { showFilters: v })}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}