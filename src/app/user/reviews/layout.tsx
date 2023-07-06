import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-4 my-8 flex min-h-[80vh] justify-center sm:mx-10 lg:mx-24 lg:my-10">
      {children}
    </main>
  );
}
