import { HtmlHTMLAttributes } from 'react';
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor, RenderLeafProps } from 'slate-react';

export type CustomElement = { type: string; children: CustomText[] };
export type CustomText = { text: string };
export type CustomMarks = { [key: string]: any };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface Leaf extends CustomText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface LeafProps extends RenderLeafProps {
  attributes: HtmlHTMLAttributes;
  leaf: CustomText;
  children: React.ReactNode;
}

export interface Block {
  type: string;
  children: CustomElement[] | Block[];
}

export interface BlockProps extends RenderElementProps {
  element: CustomElement;
  children: React.ReactNode;
  attributes: HtmlHTMLAttributes;
}

export interface EditorProps {
  content?: string;
  setContent: (content: string) => void;
}
