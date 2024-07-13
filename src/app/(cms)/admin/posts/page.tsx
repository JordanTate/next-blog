import Link from 'next/link';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { handleProtectedRoutes } from '@/lib/route';
import { getPosts } from '@/controllers/postController';
import Container from '@/components/container';
import List from '@/components/post/list';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

async function getData() {
  const posts = await getPosts();

  return { posts };
}

export default async function Posts() {
  await handleProtectedRoutes();

  const { posts } = await getData();

  return (
    <main className={styles.main}>
      <Container classes={styles.container}>
        <div className={styles.titleRow}>
          <h1>Posts</h1>
          <Link href='/admin/posts/create'>
            Create new post <IconSquareRoundedPlusFilled />
          </Link>
        </div>
        {posts != null && posts.length > 0 ? (
          <div className={styles.grid}>{posts && <List posts={posts} />}</div>
        ) : (
          <div>There are currently no posts.</div>
        )}
      </Container>
    </main>
  );
}
