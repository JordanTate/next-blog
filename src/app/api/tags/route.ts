import { NextResponse } from 'next/server';
import { getTags } from '@/controllers/tagController';

export async function GET() {
  try {
    const tags = await getTags();

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
