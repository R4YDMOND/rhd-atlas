export type BlockType =
  | 'text'
  | 'heading'
  | 'image'
  | 'video'
  | 'quote'
  | 'list'
  | 'table'
  | 'calculator'
  | 'map'
  | 'divider';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface TextBlockData extends BaseBlock {
  type: 'text';
  data: {
    content: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface HeadingBlockData extends BaseBlock {
  type: 'heading';
  data: {
    content: string;
    level: 1 | 2 | 3 | 4;
  };
}

export interface ImageBlockData extends BaseBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
    caption?: string;
    width?: 'small' | 'medium' | 'large' | 'full';
  };
}

export interface VideoBlockData extends BaseBlock {
  type: 'video';
  data: {
    provider: 'vk' | 'youtube';
    videoId: string;
    caption?: string;
  };
}

export interface QuoteBlockData extends BaseBlock {
  type: 'quote';
  data: {
    content: string;
    author?: string;
    source?: string;
  };
}

export interface ListBlockData extends BaseBlock {
  type: 'list';
  data: {
    items: string[];
    ordered: boolean;
  };
}

export interface TableBlockData extends BaseBlock {
  type: 'table';
  data: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
}

export interface CalculatorBlockData extends BaseBlock {
  type: 'calculator';
  data: {
    game: 'wwm' | 'once-human';
    configId: string;
    title?: string;
  };
}

export interface MapBlockData extends BaseBlock {
  type: 'map';
  data: {
    game: 'wwm' | 'once-human';
    title?: string;
    showFilters: boolean;
  };
}

export interface DividerBlockData extends BaseBlock {
  type: 'divider';
  data: Record<string, never>;
}

export type Block =
  | TextBlockData
  | HeadingBlockData
  | ImageBlockData
  | VideoBlockData
  | QuoteBlockData
  | ListBlockData
  | TableBlockData
  | CalculatorBlockData
  | MapBlockData
  | DividerBlockData;

export interface BlockContent {
  blocks: Block[];
}