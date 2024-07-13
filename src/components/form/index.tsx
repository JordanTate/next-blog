'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { IconPhotoUp, IconPhotoCheck, IconCheck } from '@tabler/icons-react';
import type { Post } from '@/types/post';
import Slate from '@/components/slate';
import styles from './form.module.scss';
import useForm from '@/hooks/useForm';
import useSubmit from '@/hooks/useSubmit';

export default function Form({
  endpoint,
  method,
  redirect,
  payload,
}: {
  endpoint: string;
  method: 'POST' | 'PUT';
  redirect?: string;
  payload?: Post | null;
}) {
  const router = useRouter();
  const { rendering, form, setForm, tags, setTags, handleChange } = useForm(
    payload ?? null
  );
  const { isSubmitting, success, error, handleSubmit } = useSubmit({
    endpoint,
    method,
  });
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (form.content != '') {
      setContent(form.content);
    }
  }, [form.content]);

  useEffect(() => {
    const handleRouter = (url: string) => {
      router.refresh();
      router.push(url);
    };

    if (success && redirect) {
      handleRouter(redirect);
    }
  }, [success]);

  useEffect(() => {
    if (error != '') {
      toast.error(error);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        styles.form,
        isSubmitting && styles.disabled,
        success && styles.success
      )}
    >
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor=''>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Enter a title'
            value={form.title}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor=''>
            Subtitle <small>(optional)</small>
          </label>
          <input
            type='text'
            name='subtitle'
            id='subtitle'
            placeholder='Enter a subtitle'
            value={form.subtitle ?? ''}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, subtitle: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.imageGroup}>
          <input
            type='file'
            name='image'
            id='image'
            className={clsx(form.image != '' && styles.attachedImage)}
            onChange={handleChange}
          />
          <label htmlFor='image'>
            {form.image == '' ? (
              <React.Fragment>
                {' '}
                <IconPhotoUp /> Upload an Image
              </React.Fragment>
            ) : (
              <React.Fragment>
                <IconPhotoCheck />
                Image: {form.image}
              </React.Fragment>
            )}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='alt'>
            Image Alt <small>(optional)</small>
          </label>
          <input
            type='text'
            name='alt'
            id='alt'
            placeholder='Enter the alt text that describes your image'
            value={form.alt ?? ''}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, alt: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={styles.richText}>
        <input type='hidden' name='content' value={content} />
        {!rendering ? (
          <Slate content={form.content} setContent={setContent} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor='tags'>Tags</label>
          <input
            type='text'
            name='tags'
            id='tags'
            placeholder='Enter the relevant tags for your post (comma-separated)'
            value={tags}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setTags(e.target.value)
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formCheck}>
          <input
            type='checkbox'
            name='published'
            id='published'
            checked={form.published}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, published: e.target.checked }))
            }
          />
          <label htmlFor='published'>Publish?</label>
        </div>
        <div className={styles.formCheck}>
          <input
            type='checkbox'
            name='featured'
            id='featured'
            checked={form.featured}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, featured: e.target.checked }))
            }
          />
          <label htmlFor='featured'>Set as featured post?</label>
        </div>
      </div>
      <div className={styles.btnRow}>
        <button
          type='submit'
          className={clsx(
            isSubmitting && styles.disabled,
            success && styles.success
          )}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : success ? (
            <span>
              Post Submitted <IconCheck />
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
