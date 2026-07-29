'use client';

import { useCallback } from 'react';
import { BlockPalette } from './BlockPalette';
import { BlockItem } from './BlockItem';
import type { Block, BlockType } from '@/lib/types/block';

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

function createBlock(type: BlockType, order: number): Block {
  const id = crypto.randomUUID();

  const defaults: Record<BlockType, Block> = {
    text: { id, type: 'text', order, data: { content: '', alignment: 'left' } },
    heading: { id, type: 'heading', order, data: { content: '', level: 2 } },
    image: { id, type: 'image', order, data: { src: '', alt: '', caption: '', width: 'full' } },
    video: { id, type: 'video', order, data: { provider: 'vk', videoId: '', caption: '' } },
    quote: { id, type: 'quote', order, data: { content: '', author: '', source: '' } },
    list: { id, type: 'list', order, data: { items: [''], ordered: false } },
    table: { id, type: 'table', order, data: { headers: [''], rows: [] } },
    calculator: { id, type: 'calculator', order, data: { game: 'wwm', configId: '', title: '' } },
    map: { id, type: 'map', order, data: { game: 'wwm', title: '', showFilters: true } },
    divider: { id, type: 'divider', order, data: {} },
  };

  return defaults[type];
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const addBlock = useCallback(
    (type: BlockType) => {
      const newBlock = createBlock(type, blocks.length);
      onChange([...blocks, newBlock]);
    },
    [blocks, onChange]
  );

  const updateBlock = useCallback(
    (id: string, data: Partial<Block['data']>) => {
      onChange(
        blocks.map((b) =>
          b.id === id ? { ...b, data: { ...b.data, ...data } } : b
        )
      );
    },
    [blocks, onChange]
  );

  const deleteBlock = useCallback(
    (id: string) => {
      const filtered = blocks.filter((b) => b.id !== id);
      onChange(filtered.map((b, i) => ({ ...b, order: i })));
    },
    [blocks, onChange]
  );

  const duplicateBlock = useCallback(
    (id: string) => {
      const block = blocks.find((b) => b.id === id);
      if (!block) return;
      const index = blocks.findIndex((b) => b.id === id);
      const newBlock = {
        ...block,
        id: crypto.randomUUID(),
        data: { ...block.data },
      } as Block;
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      onChange(newBlocks.map((b, i) => ({ ...b, order: i })));
    },
    [blocks, onChange]
  );

  const moveBlock = useCallback(
    (id: string, direction: 'up' | 'down') => {
      const index = blocks.findIndex((b) => b.id === id);
      if (index === -1) return;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= blocks.length) return;
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      onChange(newBlocks.map((b, i) => ({ ...b, order: i })));
    },
    [blocks, onChange]
  );

  return (
    <div className="space-y-4">
      <BlockPalette onAdd={addBlock} />

      {blocks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/10 p-8 text-center">
          <p className="text-sm text-muted-gray">
            Нет блоков. Добавьте блоки из палитры выше.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map((block, index) => (
            <BlockItem
              key={block.id}
              block={block}
              index={index}
              total={blocks.length}
              onUpdate={updateBlock}
              onDelete={deleteBlock}
              onDuplicate={duplicateBlock}
              onMove={moveBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
}