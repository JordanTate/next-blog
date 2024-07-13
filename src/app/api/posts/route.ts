import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { auth } from '@/lib/auth';
import { getPosts, createPost } from '@/controllers/postController';

export async function GET() {
  try {
    const posts = await getPosts();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return new NextResponse(null, { status: 401 });

  try {
    const formData = await request.formData();
    const post = await createPost(formData);

    revalidateTag('posts');

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
