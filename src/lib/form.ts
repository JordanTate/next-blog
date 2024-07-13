import { Tag } from '@/types/post';

export function createPostFromFormData(formData: FormData) {
  const post = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    image: '',
    alt: formData.get('alt') as string,
    content: formData.get('content') as string,
    tags: {
      connect: [] as Tag[],
    },
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  };
  const image = (formData.get('image') as File) || null;
  const tags = (formData.get('tags') as string) || '';

  return {
    post,
    image,
    tags,
  };
}

export function updatePostFromFormData(formData: FormData) {
  const post = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    image: '',
    alt: formData.get('alt') as string,
    content: formData.get('content') as string,
    tags: {
      set: [],
      connect: [] as Tag[],
    },
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  };
  const image = (formData.get('image') as File) || null;
  const tags = (formData.get('tags') as string) || '';

  return {
    post,
    image,
    tags,
  };
}
