import { cn } from '@/lib/utils';
import type { TextBlockData } from '@/lib/types/block';

interface TextBlockProps {
  block: TextBlockData;
}

export function TextBlock({ block }: TextBlockProps) {
  const { content, alignment = 'left' } = block.data;

  return (
    <p
      className={cn(
        'text-base leading-relaxed text-warm-white/90 mb-4',
        alignment === 'center' && 'text-center',
        alignment === 'right' && 'text-right',
        alignment === 'left' && 'text-left'
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}