import { NextResponse } from 'next/server';
import { getTagBySlug } from '@/controllers/tagController';

export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const tag = getTagBySlug(slug);

    return NextResponse.json(tag, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
