import type { QuoteBlockData } from '@/lib/types/block';

interface QuoteBlockProps {
  block: QuoteBlockData;
}

export function QuoteBlock({ block }: QuoteBlockProps) {
  const { content, author, source } = block.data;

  return (
    <blockquote className="my-6 border-l-2 border-antique-gold/50 pl-4">
      <p className="text-lg italic text-warm-white/90">{content}</p>
      {(author || source) && (
        <cite className="mt-2 block text-sm text-muted-gray">
          {author}
          {author && source && ' — '}
          {source}
        </cite>
      )}
    </blockquote>
  );
}