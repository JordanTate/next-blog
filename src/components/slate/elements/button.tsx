import React from 'react';
import clsx from 'clsx';
import { ElementButtonProps } from '../types/button';
import styles from './button.module.scss';

export default function Button(props: ElementButtonProps) {
  const { children, format, active, ...rest } = props;
  return (
    <button
      type='button'
      title={format}
      className={clsx(styles.button, active && styles.active)}
      {...rest}
    >
      {children}
    </button>
  );
}
