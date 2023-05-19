"use client";

import { SessionProvider } from "next-auth/react";

interface IProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
