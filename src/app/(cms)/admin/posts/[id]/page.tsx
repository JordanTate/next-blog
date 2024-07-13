import { getPost } from '@/controllers/postController';
import Container from '@/components/container';
import Form from '@/components/form';

async function getData(id: string) {
  const post = await getPost(id);

  return { post };
}

export default async function Posts({ params }: { params: { id: string } }) {
  const { post } = await getData(params.id);

  return (
    <main>
      <Container>
        <div>
          <h1>Edit Post</h1>
        </div>
        <Form
          endpoint={`/api/posts/${params.id}`}
          method={'PUT'}
          redirect='/admin/posts'
          payload={post}
        />
      </Container>
    </main>
  );
}
