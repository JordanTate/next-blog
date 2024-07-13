import Container from '@/components/container';
import styles from './page.module.scss';

export default function Page() {
  return (
    <main>
      <Container classes={styles.container}>
        <h1>About</h1>
        <div className={styles.content}>
          <p>
            I am just a simple web developer from the United Kingdom. I like to
            eat my girlfriend&apos;s <strong>amazing cooking</strong>{' '}
            <small>
              <em>(you will see many photos of this)</em>
            </small>{' '}
            and play video games in my spare time. Academically, I have a degree
            in Music Production, but now I mostly learning web development and
            Japanese.
          </p>
          <p>
            I made this blog as part of my portfolio, but I also plan to use it
            and continusouly develop it. I will be rambling on here a lot about
            all sorts of stuff, so I'm hoping the tagging system I&apos;ve created
            can keep up! I will also be posting some of my other projects here,
            either solo or with friends, so be sure to keep and eye out for that,
            or feel free to get in touch if you'd also like to contribute or give
            me some advice!
          </p>
        </div>
      </Container>
    </main>
  );
}
