import type { ListBlockData } from '@/lib/types/block';

interface ListBlockProps {
  block: ListBlockData;
}

export function ListBlock({ block }: ListBlockProps) {
  const { items, ordered } = block.data;
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      className={`mb-4 space-y-1 pl-6 ${
        ordered ? 'list-decimal' : 'list-disc'
      } text-warm-white/90 marker:text-antique-gold`}
    >
      {items.map((item, idx) => (
        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </Tag>
  );
}