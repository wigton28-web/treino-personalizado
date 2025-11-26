"use client";

import { UserProvider } from "@/contexts/UserContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
