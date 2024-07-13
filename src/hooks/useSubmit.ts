import { useState } from 'react';

export default function useSubmit({
  endpoint,
  method,
}: {
  endpoint: string;
  method: 'POST' | 'PUT';
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    setError('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      setIsSubmitting(false);

      if (response.ok) {
        setSuccess(true);

        const data = await response.json();

        return data;
      }
    } catch (error) {
      setIsSubmitting(false);
      setSuccess(false);
      setError(
        'There was an error when submitting the form. Please try again.'
      );
    }
  }

  return { isSubmitting, success, error, handleSubmit };
}
