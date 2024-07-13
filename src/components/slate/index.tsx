'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Toolbar from './toolbar';
import { getBlockElement, getLeafElement } from './utils/elements';
import styles from './slate.module.scss';
import {
  type EditorProps,
  type BlockProps,
  type LeafProps,
} from './types/slate';

const defaultValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Click here to start writing...' }],
  },
];

function Block(props: BlockProps) {
  return getBlockElement(props);
}

function Leaf({ attributes, leaf, children }: LeafProps) {
  children = getLeafElement(leaf, children);

  return <span {...attributes}>{children}</span>;
}

export default function Editor({ content, setContent }: EditorProps) {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (content && content != '') {
      setValue(JSON.parse(content));
    }
  }, [content]);

  const renderElement = useCallback(
    (props: BlockProps) => <Block {...props} />,
    []
  );

  const renderLeaf = useCallback((props: LeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={content ? JSON.parse(content) : value}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          if (setContent != null) {
            setContent(content);
          } else {
            localStorage.setItem('content', content);
          }
        }
      }}
    >
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className={styles.slate}
      />
    </Slate>
  );
}
