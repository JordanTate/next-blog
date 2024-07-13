import { useState, useEffect, type ChangeEvent } from 'react';
import type { Post } from '@/types/post';

export default function useForm(payload: Post | null) {
  const [rendering, setRendering] = useState<boolean>(true);
  const [form, setForm] = useState<Post>({
    id: '',
    title: '',
    subtitle: '',
    image: '',
    alt: '',
    content: '',
    tags: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (payload) {
      setForm(payload);

      if (payload.tags != null) {
        setTags(payload.tags.map((tag) => tag.name).join(', '));
      }
    }

    setRendering(false);
  }, [payload]);

  const handleChange = (e: ChangeEvent) => {
    if (e.target == null) return;

    const input = e.target as HTMLInputElement;
    if (input.files == null) return;

    const file = input.files[0];

    setForm((prev) => ({
      ...prev,
      image: file.name,
    }));
  };

  return {
    rendering,
    form,
    setForm,
    tags,
    setTags,
    handleChange,
  };
}
