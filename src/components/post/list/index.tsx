'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Props, { Post } from '@/types/post';
import { formatDate } from '@/utils/functions';
import useFetch from '@/hooks/useFetch';
import styles from './list.module.scss';
import clsx from 'clsx';

export default function List({ ...props }: Props) {
  const { posts } = props;
  const [postState, setPostState] = useState<Post[] | []>([]);
  const { handler, loading, error } = useFetch();

  useEffect(() => {
    setPostState(posts ?? []);
  }, [posts]);

  const handleDelete = async (id: string) => {
    try {
      await handler(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      const newPostState = postState.filter((post) => post.id !== id);
      setPostState([...newPostState]);

      toast.info('Post deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting the post');
    }
  };

  return (
    <React.Fragment>
      {postState.length > 0 &&
        postState.map((post) => (
          <div key={post.id} className={styles.list}>
            <div>{post.title}</div>
            <div className={styles.createdAt}>{formatDate(post.createdAt)}</div>
            <div className={styles.updatedAt}>
              {post.createdAt != post.updatedAt && formatDate(post.updatedAt)}
            </div>
            <div className={styles.controls}>
              <Link href={`/admin/posts/${post.id}`}>Edit</Link>
              <button
                type='button'
                className={clsx(loading && styles.loading)}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
}
