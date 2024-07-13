import { handleProtectedRoutes } from '@/lib/route';
import Container from '@/components/container';
import Form from '@/components/form';
import styles from './page.module.scss';

export default async function Create() {
  await handleProtectedRoutes();

  return (
    <main className={styles.main}>
      <Container classes={styles.container}>
        <div className={styles.titleRow}>
          <h1>Create Post</h1>
        </div>
        <Form
          endpoint={'/api/posts'}
          method={'POST'}
          redirect={'/admin/posts'}
        />
      </Container>
    </main>
  );
}
