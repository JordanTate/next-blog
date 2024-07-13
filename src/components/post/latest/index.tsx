import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import Props from '@/types/post';
import { formatDate } from '@/utils/functions';
import styles from './latest.module.scss';

export default function Latest({ ...props }: Props) {
  const { post } = props;

  if (!post) return null;
  return (
    <article className={styles.latest}>
      <div className={styles.content}>
        <div className={styles.header}>
          <small>Latest Post</small>
        </div>
        <div className={styles.body}>
          <h4>{post.title}</h4>
          <p>{post.subtitle}</p>
          <time>{formatDate(post.createdAt)}</time>
        </div>
        <div className={styles.footer}>
          <Link href={`/posts/${post.id}`} className={styles.link}>
            <span className={styles.text}>Read More</span>
            <span className={styles.icon}>
              <IconArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
