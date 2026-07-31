'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft, Eye, Pencil, Plus, Save, Trash2 } from 'lucide-react';

import { DataTable } from '@/components/data-table/DataTable';
import { DataTableColumnHeader } from '@/components/data-table/DataTableColumnHeader';
import { DeleteDialog } from '@/components/cms/dialogs/DeleteDialog';
import { BlockEditor } from '@/components/cms/editor/BlockEditor';
import { BlockRenderer } from '@/components/cms/blocks/BlockRenderer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import PageHeader from '@/components/common/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Block } from '@/lib/types/block';
import type { Article, ArticleKind, ContentStatus, Difficulty } from '@/lib/types/article';

type Game = { id: string; title: string; slug: string };

const KIND_CONFIG: Record<ArticleKind, { label: string; endpoint: string; createLabel: string }> = {
  news: { label: 'Новости', endpoint: '/api/news', createLabel: 'Создать новость' },
  guides: { label: 'Гайды', endpoint: '/api/guides', createLabel: 'Создать гайд' },
  builds: { label: 'Билды', endpoint: '/api/builds', createLabel: 'Создать билд' },
};

const STATUS_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: 'DRAFT', label: 'Черновик' },
  { value: 'PUBLISHED', label: 'Опубликовано' },
  { value: 'ARCHIVED', label: 'Архив' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'BEGINNER', label: 'Новичок' },
  { value: 'INTERMEDIATE', label: 'Средний' },
  { value: 'ADVANCED', label: 'Продвинутый' },
];

const BUILD_STYLE_OPTIONS = [
  { value: 'PVE', label: 'PvE' },
  { value: 'PVP', label: 'PvP' },
  { value: 'HYBRID', label: 'Гибрид' },
];

function statusVariant(status: ContentStatus) {
  if (status === 'PUBLISHED') return 'default' as const;
  if (status === 'ARCHIVED') return 'destructive' as const;
  return 'secondary' as const;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type View = 'list' | 'edit' | 'preview';

type FormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string; // используется как excerpt (news/guides) либо description (builds)
  status: ContentStatus;
  gameId: string;
  difficulty: Difficulty;
  version: string; // guides
  weapon: string; // builds
  style: string; // builds
  role: string; // builds
};

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  status: 'DRAFT',
  gameId: '',
  difficulty: 'BEGINNER',
  version: '',
  weapon: '',
  style: 'PVE',
  role: '',
};

function ContentTypeView({ kind }: { kind: ArticleKind }) {
  const config = KIND_CONFIG[kind] ?? KIND_CONFIG.news;

  const [view, setView] = useState<View>('list');
  const [items, setItems] = useState<Article[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const loadItems = useCallback(async () => {
    try {
      const res = await fetch(config.endpoint);
      if (!res.ok) throw new Error('Не удалось загрузить список');
      setItems(await res.json());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  }, [config.endpoint]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(config.endpoint);
        if (!res.ok) throw new Error('Не удалось загрузить список');
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch (error) {
        if (!cancelled) toast.error(error instanceof Error ? error.message : 'Ошибка загрузки');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [config.endpoint]);

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then(setGames)
      .catch(() => toast.error('Не удалось загрузить список игр'));
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setBlocks([]);
    setSlugTouched(false);
  };

  const handleCreate = () => {
    resetForm();
    setView('edit');
  };

  const handleEdit = (item: Article) => {
    const record = item as Article & Record<string, unknown>;
    setForm({
      id: record.id as string,
      title: record.title as string,
      slug: record.slug as string,
      excerpt: (record.excerpt ?? record.description ?? '') as string,
      status: record.status as ContentStatus,
      gameId: record.gameId as string,
      difficulty: (record.difficulty ?? 'BEGINNER') as Difficulty,
      version: (record.version ?? '') as string,
      weapon: (record.weapon ?? '') as string,
      style: (record.style ?? 'PVE') as string,
      role: (record.role ?? '') as string,
    });
    setBlocks((record.body as unknown as Block[]) ?? []);
    setSlugTouched(true);
    setView('edit');
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.gameId) {
      toast.error('Заполните заголовок, slug и игру');
      return;
    }

    const payload: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      status: form.status,
      gameId: form.gameId,
      body: blocks,
    };

    if (kind === 'builds') {
      payload.description = form.excerpt;
      payload.weapon = form.weapon;
      payload.style = form.style;
      payload.difficulty = form.difficulty;
      payload.role = form.role;
    } else {
      payload.excerpt = form.excerpt;
      if (kind === 'guides') {
        payload.difficulty = form.difficulty;
        payload.version = form.version || undefined;
      }
    }

    setIsSaving(true);
    try {
      const res = await fetch(form.id ? `${config.endpoint}/${form.id}` : config.endpoint, {
        method: form.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Не удалось сохранить запись');
      }

      toast.success(form.id ? 'Изменения сохранены' : 'Запись создана');
      setView('list');
      loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${config.endpoint}/${(deleteTarget as { id: string }).id}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 204) throw new Error('Не удалось удалить запись');
      toast.success('Запись удалена');
      setDeleteTarget(null);
      loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка удаления');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = useMemo<ColumnDef<Article, unknown>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Заголовок" />,
        cell: ({ row }) => (
          <span className="font-medium text-warm-white">{(row.original as { title: string }).title}</span>
        ),
      },
      {
        id: 'game',
        header: 'Игра',
        cell: ({ row }) => (row.original as { game?: { title: string } }).game?.title ?? '—',
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Статус" />,
        cell: ({ row }) => {
          const status = (row.original as { status: ContentStatus }).status;
          const label = STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
          return <Badge variant={statusVariant(status)}>{label}</Badge>;
        },
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Обновлено" />,
        cell: ({ row }) =>
          new Date((row.original as { updatedAt: string | Date }).updatedAt).toLocaleDateString('ru-RU'),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="icon-sm" onClick={() => handleEdit(row.original)}>
              <Pencil className="size-4" />
            </Button>
            <Button variant="destructive" size="icon-sm" onClick={() => setDeleteTarget(row.original)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  if (view === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setView('list')}>
            <ArrowLeft className="mr-2 size-4" />
            Назад
          </Button>
          <Button variant="ghost" onClick={() => setView('preview')} disabled={blocks.length === 0}>
            <Eye className="mr-2 size-4" />
            Превью
          </Button>
          <div className="flex-1" />
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 size-4" />
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm text-muted-gray">Заголовок</label>
            <Input
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  title,
                  slug: slugTouched ? prev.slug : slugify(title),
                }));
              }}
              placeholder="Заголовок"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-muted-gray">Slug</label>
            <Input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm((prev) => ({ ...prev, slug: e.target.value }));
              }}
              placeholder="url-slug"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-muted-gray">Игра</label>
            <Select
              value={form.gameId}
              onValueChange={(value) => setForm((prev) => ({ ...prev, gameId: value as string }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите игру" />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game.id} value={game.id}>
                    {game.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-muted-gray">Статус</label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm((prev) => ({ ...prev, status: value as ContentStatus }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm text-muted-gray">
              {kind === 'builds' ? 'Описание' : 'Краткое описание'}
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder={kind === 'builds' ? 'Описание билда' : 'Краткое описание для карточки'}
            />
          </div>

          {kind === 'guides' && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Сложность</label>
                <Select
                  value={form.difficulty}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, difficulty: value as Difficulty }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Версия игры</label>
                <Input
                  value={form.version}
                  onChange={(e) => setForm((prev) => ({ ...prev, version: e.target.value }))}
                  placeholder="напр. 1.2.0"
                />
              </div>
            </>
          )}

          {kind === 'builds' && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Оружие</label>
                <Input
                  value={form.weapon}
                  onChange={(e) => setForm((prev) => ({ ...prev, weapon: e.target.value }))}
                  placeholder="напр. Меч"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Роль</label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="напр. DPS"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Стиль</label>
                <Select
                  value={form.style}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, style: value as string }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUILD_STYLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-gray">Сложность</label>
                <Select
                  value={form.difficulty}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, difficulty: value as Difficulty }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-warm-white">Контент (блоки)</h2>
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        </div>
      </div>
    );
  }

  if (view === 'preview') {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setView('edit')}>
          <ArrowLeft className="mr-2 size-4" />
          Редактор
        </Button>
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-warm-white">{form.title}</h1>
          <BlockRenderer blocks={blocks} />
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Контент"
        description="Новости, гайды и билды сайта"
        action={<Button onClick={handleCreate}>
          <Plus className="mr-2 size-4" />
          {config.createLabel}
        </Button>}
      />

      <div className="flex gap-2 border-b border-white/10">
        {(Object.keys(KIND_CONFIG) as ArticleKind[]).map((key) => (
          <Link
            key={key}
            href={`/admin/content?type=${key}`}
            className={cn(
              'px-4 py-2 text-sm font-medium text-muted-gray transition-colors hover:text-warm-white',
              kind === key && 'border-b-2 border-[#C7A56A] text-warm-white'
            )}
          >
            {KIND_CONFIG[key].label}
          </Link>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        searchPlaceholder={`Поиск по ${config.label.toLowerCase()}...`}
        globalFilterKey="title"
      />

      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={(deleteTarget as { title: string } | null)?.title ?? ''}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function ContentAdminPageInner() {
  const searchParams = useSearchParams();
  const kind = (searchParams.get('type') as ArticleKind) ?? 'news';

  return <ContentTypeView key={kind} kind={kind} />;
}

export default function ContentAdminPage() {
  return (
    <Suspense fallback={null}>
      <ContentAdminPageInner />
    </Suspense>
  );
}
