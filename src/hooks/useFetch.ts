import { useState } from 'react';

export default function useFetch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handler = async (url: string, options: RequestInit) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setLoading(false);

      return data;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { handler, loading, error };
}
