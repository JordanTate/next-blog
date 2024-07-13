'use client';

import Link from 'next/link';
import { useRef } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

interface ButtonConfig {
  isLink: boolean;
  to: string;
  title: string;
  ariaLabel?: string;
  onClick?: () => void;
  classes?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  config: ButtonConfig;
}

const defaultConfig: ButtonConfig = {
  isLink: false,
  to: '',
  title: '',
};

export default function Button({
  children,
  config = defaultConfig,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Mousemove event for handling the cursor spotlight and the
  // button tilt effects based on mouse position.
  const handleHover = (event: React.MouseEvent) => {
    if (ref.current) {
      const el = ref.current;
      const { clientX, clientY } = event;

      const { x, y, width, height } = el.getBoundingClientRect();

      // Mouse Coordinates
      const X = ((clientX - x) / width) * 100;
      const Y = ((clientY - y) / height) * 100;

      el.style.setProperty('--x', `${X}%`);
      el.style.setProperty('--y', `${Y}%`);

      // Calculate tilt values
      const tiltX = ((clientX - (x + width / 2)) / (width / 2)).toFixed(2);
      const tiltY = ((clientY - (y + height / 2)) / (height / 2)).toFixed(2);

      el.style.setProperty('--tiltX', `${tiltX}deg`);
      el.style.setProperty('--tiltY', `${tiltY}deg`);
    }
  };

  return (
    <>
      {config.isLink ? (
        <Link
          ref={ref as React.MutableRefObject<HTMLAnchorElement>}
          href={config.to}
          className={clsx(
            'btn',
            styles.button,
            config.classes && config.classes
          )}
          onMouseMove={handleHover}
        >
          <>{children}</>
        </Link>
      ) : (
        <button
          ref={ref as React.MutableRefObject<HTMLButtonElement>}
          onClick={config.onClick}
          className={clsx(styles.button, config.classes && config.classes)}
          onMouseMove={handleHover}
          aria-label={config.ariaLabel}
        >
          {children}
        </button>
      )}
    </>
  );
}
