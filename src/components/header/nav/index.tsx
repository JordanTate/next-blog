'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import clsx from 'clsx';
import Theme from '@/components/theme';
import styles from './nav.module.scss';

const navItems = [
  { title: 'Posts', path: '/posts' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (window.innerWidth >= 912) return;

    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <Theme />
      <button
        type='button'
        className={clsx(styles.navToggle, open && styles.open)}
        onClick={() => setOpen(!open)}
        aria-label='Toggle Navigation'
      >
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <nav className={clsx(styles.nav, open && styles.open)}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path} title={item.title} onClick={handleToggle}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
