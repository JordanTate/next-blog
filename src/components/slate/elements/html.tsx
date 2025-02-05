import { Text } from 'slate';
import { Block, Leaf } from '../types/slate';

function serialize(node: Block): JSX.Element | string {
  console.log(node);

  if (Text.isText(node)) {
    let string = <span>{node.text}</span>;
    const leaf = node as Leaf;

    if (leaf.bold) {
      string = <strong>${string}</strong>;
    }

    return string;
  }

  const children = node.children.map((n) => serialize(n as Block)).join('');

  switch (node.type) {
    case 'heading-one':
      return <h1>{children}</h1>;
    case 'heading-two':
      return <h2>{children}</h2>;
    case 'heading-three':
      return <h3>{children}</h3>;
    case 'heading-four':
      return <h4>${children}</h4>;
    case 'heading-five':
      return <h5>{children}</h5>;
    case 'heading-six':
      return <h6>{children}</h6>;
    case 'block-quote':
      return <blockquote>{children}</blockquote>;
    case 'bulleted-list':
      return <ul>${children}</ul>;
    case 'numbered-list':
      return <ol>{children}</ol>;
    case 'list-item':
      return <li>${children}</li>;
    case 'code':
      return <code>${children}</code>;
    case 'paragraph':
      return <p>${children}</p>;
    default:
      return children;
  }
}

export default function Serialize({ node }: { node: Block }) {
  return <div>{serialize(node)}</div>;
}
