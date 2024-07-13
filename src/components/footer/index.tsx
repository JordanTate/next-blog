import Link from 'next/link';
import Container from '../container';
import styles from './footer.module.scss';
import { IconBrandGithubFilled } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container classes={styles.container}>
        <p>
          <span>Copyright &copy; {new Date().getFullYear()} Jordan Tate</span>
          <Link href='https://github.com/jordantate'><IconBrandGithubFilled /></Link>
        </p>
      </Container>
    </footer>
  );
}
