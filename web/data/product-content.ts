export type ContentNode = {
  text?: string;
  tag?: string;
  children?: ContentNode[];
  src?: string;
  source?: string;
  alt?: string;
  width?: number;
  height?: number;
  colspan?: number;
  rowspan?: number;
};

export type ImportedContent = {
  summary: ContentNode[];
  detail: ContentNode[];
  description: string;
  hero: { src: string; width: number; height: number };
};
