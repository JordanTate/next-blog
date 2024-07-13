import { Post } from '@/types/post';

export function getLatestPost(posts: Post[]) {
  const sortPostsByCreatedAt = posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortPostsByCreatedAt.length > 0) {
    return sortPostsByCreatedAt[0];
  } else {
    return null;
  }
}

export function getFeaturedPost(posts: Post[]) {
  const featuredPost = posts.find((post) => post.featured);

  if (featuredPost) {
    return featuredPost;
  } else {
    return null;
  }
}

export function formatTagString(tags: string) {
  return [
    ...tags
      .split(',')
      .map((tag) => ({ id: '', name: tag.trim().toLowerCase() })),
  ];
}

export function formatDate(date: Date) {
  const datetime = new Date(date);

  const day = datetime.toLocaleDateString('en-GB', {
    day: 'numeric',
  });

  const month = datetime.toLocaleDateString('en-GB', {
    month: 'long',
  });

  const year = datetime.toLocaleDateString('en-GB', {
    year: 'numeric',
  });

  const daySuffix =
    day === '1' || day === '21' || day === '31'
      ? 'st'
      : day === '2' || day === '22'
      ? 'nd'
      : day === '3' || day === '23'
      ? 'rd'
      : 'th';

  return `${month} ${day}${daySuffix} ${year}`;
}

export function formatPath(path: string) {
  var folder = path;

  if (path.startsWith('/')) {
    folder = path.slice(1);
  }

  if (path.endsWith('/')) {
    folder = path.slice(0, -1);
  }

  return folder ? `${folder}/` : '';
}
