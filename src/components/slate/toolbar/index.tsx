'use client';

import React from 'react';
import { useSlate } from 'slate-react';
import Button from '../elements/button';
import Icon from '../elements/icon';
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from '../utils/helpers';
import { ToolbarButtonProps } from '../types/button';

import styles from './toolbar.module.scss';

function BlockButton({ format, icon }: ToolbarButtonProps) {
  const editor = useSlate();

  return (
    <Button
      format={format}
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
}

function MarkButton({ format, icon }: ToolbarButtonProps) {
  const editor = useSlate();

  return (
    <Button
      format={format}
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <MarkButton format='bold' icon='bold' />
        <MarkButton format='italic' icon='italic' />
        <MarkButton format='underline' icon='underline' />
        <MarkButton format='code' icon='code' />
      </div>
      <div className={styles.group}>
        <BlockButton format='heading-one' icon='heading-one' />
        <BlockButton format='heading-two' icon='heading-two' />
        <BlockButton format='heading-three' icon='heading-three' />
        <BlockButton format='heading-four' icon='heading-four' />
        <BlockButton format='heading-five' icon='heading-five' />
        <BlockButton format='heading-six' icon='heading-six' />
      </div>
    </div>
  );
}
