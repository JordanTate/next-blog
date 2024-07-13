import prisma from '@/lib/db';

export async function getTagBySlug(slug: string) {
  const tag = await prisma.tag.findFirst({
    where: { slug },
    include: {
      posts: true,
    },
  });

  return tag;
}

export async function getTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}
