'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table/DataTable';
import { BlockEditor } from '@/components/cms/editor/BlockEditor';
import { BlockRenderer } from '@/components/cms/blocks/BlockRenderer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import type { Block } from '@/lib/types/block';
import type { Article } from '@/lib/types/article';

type View = 'list' | 'edit' | 'preview';

export default function ContentAdminPage() {
  const [view, setView] = useState<View>('list');
  const [editingItem, setEditingItem] = useState<Article | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleEdit = (item: Article) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setBlocks(item.content?.blocks ?? []);
    setView('edit');
  };

  const handleCreate = () => {
    setEditingItem(null);
    setTitle('');
    setSlug('');
    setBlocks([]);
    setView('edit');
  };

  const handleSave = () => {
    // TODO: интеграция с API
    console.log('Save:', { title, slug, blocks });
    setView('list');
  };

  if (view === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setView('list')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <Button variant="ghost" onClick={() => setView('preview')}>
            <Eye className="mr-2 h-4 w-4" />
            Превью
          </Button>
          <div className="flex-1" />
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </Button>
        </div>

        <div className="grid gap-4">
          <Input
            label="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок статьи"
          />
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="url-slug"
          />
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-warm-white">
            Контент (блоки)
          </h2>
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        </div>
      </div>
    );
  }

  if (view === 'preview' && editingItem) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setView('edit')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Редактор
          </Button>
        </div>
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-warm-white">{title}</h1>
          <BlockRenderer blocks={blocks} />
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-warm-white">Контент</h1>
        <Button onClick={handleCreate}>Создать</Button>
      </div>
      <DataTable
      // TODO: подключить данные из API
      />
    </div>
  );
}