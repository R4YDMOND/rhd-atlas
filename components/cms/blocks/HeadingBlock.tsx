import { cn } from '@/lib/utils';
import type { HeadingBlockData } from '@/lib/types/block';

interface HeadingBlockProps {
  block: HeadingBlockData;
}

const headingStyles = {
  1: 'text-4xl font-bold text-warm-white mt-8 mb-4',
  2: 'text-3xl font-semibold text-warm-white mt-6 mb-3',
  3: 'text-2xl font-medium text-warm-white mt-5 mb-2',
  4: 'text-xl font-medium text-warm-white/90 mt-4 mb-2',
} as const;

export function HeadingBlock({ block }: HeadingBlockProps) {
  const { content, level } = block.data;
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(headingStyles[level], 'scroll-mt-20')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}