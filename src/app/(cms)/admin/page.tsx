import Link from 'next/link';
import { handleProtectedRoutes } from '@/lib/route';
import Container from '@/components/container';
import styles from './page.module.scss';

export default async function Admin() {
  await handleProtectedRoutes();

  return (
    <main className={styles.main}>
      <Container classes={styles.container}>
        <h1>Admin</h1>
        <div className={styles.navigation}>
          <div className={styles.item}>
            <Link href={`/admin/posts`}>Posts</Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
