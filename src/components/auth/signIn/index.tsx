import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit">Sign In with Google</button>
    </form>
  );
}
