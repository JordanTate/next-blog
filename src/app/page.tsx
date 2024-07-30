import type { Post, Tag } from '@/types/post';
import { getPosts } from '@/controllers/postController';
import { getTags } from '@/controllers/tagController';
import Container from '@/components/container';
import Button from '@/components/button';
import Latest from '@/components/post/latest';
import Featured from '@/components/post/featured';
import { getFeaturedPost, getLatestPost } from '@/utils/functions';
import styles from './page.module.scss';

// Revalidate every hour
export const revalidate = 3600;

async function getData() {
  const posts = await getPosts();
  const tags = await getTags();

  return { posts, tags };
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Another Blog for the Road?</h1>
        <p>
          Here I&apos;ll write all about my recent projects, learnings and{' '}
          <em>even</em> recipes
        </p>
        <Button
          config={{
            isLink: true,
            to: '/posts',
            title: 'See all posts',
            classes: `${styles.button}`,
          }}
        >
          See all posts
        </Button>
      </div>
    </section>
  );
}

async function About({ tags }: { tags: Tag[] }) {
  return (
    <section className={styles.about}>
      <div className={styles.column}>
        <div className={styles.intro}>
          <h2>Hello, I&apos;m Jordan</h2>
          <p>
            I&apos;m a software developer, a writer, a musician, and enthusiast
            for games, books, films and food! You know what they say right?
            &quot;Jack of all trades, master of none&quot; - Well... They&apos;d
            be right. But if you&apos;re in the mood to read my franatic
            ramblings, about anything and everything that I find vaguely
            interesting, then you&apos;re in the right place and I appreciate
            your time.
          </p>
        </div>
        <div className={styles.topics}>
          <h3>Interested in a specific topic?</h3>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Button
                key={tag.id}
                config={{
                  isLink: true,
                  to: `/tags/${tag.slug}`,
                  title: tag.name,
                  classes: `${styles.topic}`,
                }}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

async function Posts({ posts }: { posts: Post[] }) {
  const featuredPost = getFeaturedPost(posts);
  const latestPost = getLatestPost(posts);

  return (
    <section className={styles.posts}>
      <div className={styles.column}>
        {latestPost && <Latest post={latestPost} />}
      </div>
      <div className={styles.column}>
        {featuredPost && <Featured post={featuredPost} />}
      </div>
    </section>
  );
}

export default async function Home() {
  const { posts, tags } = await getData();

  return (
    <main className={styles.main}>
      <Container>
        <Hero />
        {tags && <About tags={tags} />}
        {posts && <Posts posts={posts} />}
      </Container>
    </main>
  );
}
