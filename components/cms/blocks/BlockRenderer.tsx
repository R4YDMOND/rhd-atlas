import { Fragment, type ComponentType } from 'react';
import type { Block } from '@/lib/types/block';
import { TextBlock } from './TextBlock';
import { HeadingBlock } from './HeadingBlock';
import { ImageBlock } from './ImageBlock';
import { VideoBlock } from './VideoBlock';
import { QuoteBlock } from './QuoteBlock';
import { ListBlock } from './ListBlock';
import { TableBlock } from './TableBlock';
import { CalculatorBlock } from './CalculatorBlock';
import { MapBlock } from './MapBlock';
import { DividerBlock } from './DividerBlock';

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

const blockComponents = {
  text: TextBlock,
  heading: HeadingBlock,
  image: ImageBlock,
  video: VideoBlock,
  quote: QuoteBlock,
  list: ListBlock,
  table: TableBlock,
  calculator: CalculatorBlock,
  map: MapBlock,
  divider: DividerBlock,
} as const;

export function BlockRenderer({ blocks, className }: BlockRendererProps) {
  if (!blocks?.length) return null;

  return (
    <div className={className}>
      {blocks.map((block) => {
        const Component = blockComponents[block.type] as ComponentType<{ block: Block }>;
        if (!Component) return null;
        return (
          <Fragment key={block.id}>
            <Component block={block} />
          </Fragment>
        );
      })}
    </div>
  );
}