import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function handleProtectedRoutes() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  if (user?.role !== 'admin') {
    redirect('/');
  }
}