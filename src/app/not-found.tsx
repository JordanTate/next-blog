import Link from 'next/link';
import { IconFileSad } from '@tabler/icons-react';
import Container from '@/components/container';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main>
      <Container classes={styles.container}>
        <div>
          <h1>
            <IconFileSad width={48} height={48} stroke={1} />
            404 - Page Not Found
          </h1>
          <p>
            It like that page doesn&apos;t exist... Maybe the URL is wrong, or
            maybe I&apos;ve forgotten to code it. Either way,{' '}
            <Link href='/'>back to the homepage?</Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
