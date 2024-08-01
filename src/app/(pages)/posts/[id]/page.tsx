import Image from 'next/image';
import type { Post } from '@/types/post';
import type { Block } from '@/components/slate/types/slate';
import { getImageUrl } from '@/lib/s3';
import { getPost } from '@/controllers/postController';
import Container from '@/components/container';
import { serialize } from '@/components/slate/utils/helpers';
import styles from './page.module.scss';

// Revalidate every hour
export const revalidate = 3600;

async function getData(id: string): Promise<Post | null> {
  const post = await getPost(id);

  return post;
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getData(params.id);
  if (!post) return null;

  const content = {
    children: [
      ...JSON.parse(post.content)
    ]
  }

  return (
    <main>
      <Container classes={styles.container}>
        <div className={styles.blog}>
          {post.image != null && 
            <div className={styles.hero}>
              <Image src={getImageUrl(post.image)} alt={post.alt ?? ''} width={1600} height={400} />
              <div className={styles.overlay}>
                <h1>{post.title}</h1>
              </div>
            </div>
          }
          {
            content && <div dangerouslySetInnerHTML={{__html: serialize(content as Block)}}></div>  
          }
        </div>
      </Container>
    </main>
  );
}
