import { getPosts } from '@/controllers/postController';
import Container from '@/components/container';
import Result from '@/components/post/result';
import styles from './page.module.scss';

// Revalidate every hour
export const revalidate = 3600;

async function getData() {
  const posts = await getPosts();

  return { posts };
}

export default async function Page() {
  const { posts } = await getData();

  return (
    <main>
      <Container classes={styles.container}>
        <div className={styles.titleRow}>
          <h1>All Posts</h1>
        </div>
        <div className={styles.results}>
          {posts && <Result posts={posts} />}
        </div>
      </Container>
    </main>
  );
}
