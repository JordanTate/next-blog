import Container from '@/components/container';
import Result from '@/components/post/result';
import { getTagBySlug } from '@/controllers/tagController';
import styles from './page.module.scss'

// Revalidate every hour
export const revalidate = 3600;

async function getData(slug: string) {
  const tag = await getTagBySlug(slug);

  return { tag };
}

export default async function Tags({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { tag } = await getData(slug);
  const posts = tag?.posts || [];

  return (
    <main>
      <Container classes={styles.container}> 
        <div className={styles.titleRow}>
          <h1>{tag?.name}</h1>
        </div>
        <div className={styles.results}>
          {posts && <Result posts={posts} /> }
        </div>
      </Container>
    </main>
  );
}
