'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IconSunHigh, IconMoonStars } from '@tabler/icons-react';
import Button from '../button';
import styles from './theme.module.scss';

export default function Theme() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const config = {
    isLink: false,
    to: '',
    title: '',
    ariaLabel: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
    onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    classes: styles.toggle,
  };

  return (
    <Button config={config}>
      {theme === 'light' ? (
        <IconMoonStars width={32} height={32} stroke={1} />
      ) : (
        <IconSunHigh width={32} height={32} stroke={1} />
      )}
    </Button>
  );
}
