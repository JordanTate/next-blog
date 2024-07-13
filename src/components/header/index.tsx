import Link from 'next/link';
import Image from 'next/image';
import Container from '../container';
import Nav from './nav';
import avatar from '@/assets/avatar.png';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container classes={`${styles.container}`}>
        <Link href='/' title='Home' className={styles.logo}>
          <Image src={avatar} alt={'Avatar'} width={64} height={64} />
        </Link>
        <Nav />
      </Container>
    </header>
  );
}
