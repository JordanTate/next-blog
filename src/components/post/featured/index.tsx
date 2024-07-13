import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '@tabler/icons-react';
import Props from '@/types/post';
import styles from './featured.module.scss';
import { formatDate } from '@/utils/functions';
import { getImageUrl } from '@/lib/s3';

export default function Featured({ ...props }: Props) {
  const { post } = props;
  if (!post) return null;

  return (
    <article className={styles.featured}>
      <div className={styles.content}>
        <div className={styles.header}>
          <small>Featured Post</small>
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
      {post.image && (
        <div className={styles.image}>
          <Image
            src={getImageUrl(post.image)}
            alt={post.alt ? post.alt : post.title}
            width={225}
            height={300}
          />
        </div>
      )}
    </article>
  );
}
