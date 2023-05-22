"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function Session() {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("github")}>Sign in</button>;
  }

  return (
    <>
      <pre>
        <p>{JSON.stringify(session, null, 2)}</p>
      </pre>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
