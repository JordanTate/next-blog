import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deletePost, getPost, updatePost } from '@/controllers/postController';

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const post = await getPost(id);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return new NextResponse(null, { status: 401 });

  try {
    const { id } = params;
    const formData = await request.formData();
    const post = await updatePost(id, formData);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return new NextResponse(null, { status: 401 });

  try {
    const { id } = params;
    const formData = await request.formData();
    const post = await updatePost(id, formData);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return new NextResponse(null, { status: 401 });

  const { id } = params;

  try {
    await deletePost(id);

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
