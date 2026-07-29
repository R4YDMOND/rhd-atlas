import { cn } from '@/lib/utils';
import type { ImageBlockData } from '@/lib/types/block';

interface ImageBlockProps {
  block: ImageBlockData;
}

const widthStyles = {
  small: 'max-w-xs',
  medium: 'max-w-md',
  large: 'max-w-2xl',
  full: 'w-full',
} as const;

export function ImageBlock({ block }: ImageBlockProps) {
  const { src, alt, caption, width = 'full' } = block.data;

  return (
    <figure className={cn('mx-auto mb-6', widthStyles[width])}>
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg border border-white/10"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-gray">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}