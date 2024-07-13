import clsx from 'clsx';
import styles from './container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  classes?: string;
}

export default function Container({ children, classes }: ContainerProps) {
  return (
    <div className={clsx(styles.container, classes && classes)}>{children}</div>
  );
}
