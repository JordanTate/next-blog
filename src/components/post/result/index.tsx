import Image from 'next/image';
import React from 'react';
import Props from '@/types/post';
import styles from './result.module.scss';
import { formatDate } from '@/utils/functions';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { getImageUrl } from '@/lib/s3';

export default function Result({ ...props }: Props) {
  const { posts } = props;

  return (
    <React.Fragment>
      {posts &&
        posts.length > 0 &&
        posts?.map((post) => (
          <div key={post.id} className={styles.result}>
            <div className={styles.header}>
              {post?.image != null && (
                <Link href={`/posts/${post.id}`} className={styles.postImage}>
                  <Image
                    src={getImageUrl(post.image)}
                    alt={post.alt ?? ''}
                    width={400}
                    height={400}
                  />
                </Link>
              )}
            </div>
            <div className={styles.body}>
              <h3>{post.title}</h3>
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
        ))}
    </React.Fragment>
  );
}
