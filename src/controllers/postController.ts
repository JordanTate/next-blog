import prisma from '@/lib/db';
import { createPostFromFormData, updatePostFromFormData } from '@/lib/form';
import { getImageUrl, uploadImage } from '@/lib/s3';
import { formatTagString } from '@/utils/functions';

export async function getPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  });
}

export async function getPostsByTag(tag: string) {
  return prisma.tag.findUnique({
    where: { slug: tag },
    include: {
      posts: {
        include: {
          tags: true,
        },
      },
    },
  });
}

export async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });
}

export async function createPost(data: FormData) {
  const { post: obj, image, tags } = createPostFromFormData(data);

  // Image Validation
  if (image) {
    try {
      // Optional path arguement should be relative, and without leading or trailing slashes
      const { imageKey } = await uploadImage(image, 'blog');

      obj.image = imageKey;
    } catch (error) {
      throw new Error(
        'There was an error uploading the image. Please try again.'
      );
    }
  }

  // Tags
  const tagString = tags;

  if (tagString !== '') {
    try {
      const postTags = formatTagString(data.get('tags') as string);
      const tagArray = [];

      for (const tag of postTags) {
        const newTag = await prisma.tag.upsert({
          where: { name: tag.name },
          update: {
            name: tag.name,
            slug: encodeURIComponent(tag.name),
          },
          create: {
            name: tag.name,
            slug: encodeURIComponent(tag.name),
          },
        });

        tagArray.push(newTag);
      }

      obj.tags.connect = tagArray.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      }));
    } catch (error) {
      throw new Error(
        'There was an error creating or updating the tags. Please try again.'
      );
    }
  }

  try {
    const post = await prisma.post.create({
      data: {
        ...obj,
      },
    });

    return post;
  } catch (error) {
    console.log(error);
    throw new Error(
      'There was an error when creating the post. Please try again.'
    );
  }
}

export async function updatePost(id: string, data: FormData) {
  const { post: obj, image, tags } = updatePostFromFormData(data);

  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw new Error('The post you are trying to update does not exist.');
  }

  // Image Validation
  if (image && image.name !== '') {
    try {
      // Optional path arguement should be relative, and without leading or trailing slashes
      const { imageKey } = await uploadImage(image, 'blog');

      obj.image = imageKey;
    } catch (error) {
      throw new Error(
        'There was an error uploading the image. Please try again.'
      );
    }
  } else {
    obj.image = existingPost.image ?? '';
  }

  // Tags
  const tagString = tags;

  if (tagString !== '') {
    try {
      const postTags = formatTagString(data.get('tags') as string);
      const tagArray = [];

      for (const tag of postTags) {
        const newTag = await prisma.tag.upsert({
          where: { name: tag.name },
          update: {
            name: tag.name,
            slug: encodeURIComponent(tag.name),
          },
          create: {
            name: tag.name,
            slug: encodeURIComponent(tag.name),
          },
        });

        tagArray.push(newTag);
      }

      obj.tags.connect = tagArray.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      }));
    } catch (error) {
      throw new Error(
        'There was an error creating or updating the tags. Please try again.'
      );
    }
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...obj,
      },
    });

    return post;
  } catch (error) {
    console.log(error);
    throw new Error(
      'There was an error when updating the post. Please try again.'
    );
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });

    return;
  } catch (error) {
    throw new Error(
      'There was an error when deleting the post. Please try again.'
    );
  }
}
