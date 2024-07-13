import { Editor, Element, Node, Text, Transforms } from 'slate';
import { CustomMarks } from '@/components/slate/types/slate';

const ALIGNMENT_TYPES = ['left', 'center', 'right', 'justify'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

function isEditorAndElement(node: Node, array: string[]) {
  if (!Editor.isEditor(node) && Element.isElement(node))
    return array.includes(node.type);
  else return false;
}

export function isBlockActive(editor: Editor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === format,
  });

  return !!match;
}

export function isMarkActive(editor: Editor, format: string) {
  const marks: CustomMarks = Editor.marks(editor) as CustomMarks;

  if (marks && typeof format === 'string')
    return marks ? marks[format] === true : false;
  else return false;
}

export function toggleBlock(editor: Editor, format: string) {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  const isIndentFormat = ALIGNMENT_TYPES.includes(format);
  const isAlreadyAligned = ALIGNMENT_TYPES.some((type) =>
    isBlockActive(editor, type)
  );

  // If node is already aligned, and indent format is applied, unwrap the previous formatting first
  // This prevents a mess of nested alignment nodes and relevant bugs
  if (isIndentFormat && isAlreadyAligned) {
    Transforms.unwrapNodes(editor, {
      match: (node) => isEditorAndElement(node, ALIGNMENT_TYPES),
      split: true,
    });
  }

  if (isIndentFormat) {
    Transforms.wrapNodes(editor, { type: format, children: [] });
    return;
  }

  Transforms.unwrapNodes(editor, {
    match: (node) => isEditorAndElement(node, LIST_TYPES),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (isList && isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
}

export function toggleMark(editor: Editor, format: string) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export const serialize = (node: Node) => {
  if (Text.isText(node)) {
    let string = node.text;

    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    return string;
  }

  const children = node.children.map(n => serialize(n)).join('');

  switch (node.type) {
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'heading-three':
      return `<h3>${children}</h3>`;
    case 'heading-four':
      return `<h4>${children}</h4>`;
    case 'heading-five':
      return `<h5>${children}</h5>`;
    case 'heading-six':
      return `<h6>${children}</h6>`;
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'code':
      return `<code>${children}</code>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    default:
      return children;
  }
}
