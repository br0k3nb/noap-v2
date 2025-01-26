// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PrimeReactProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </PrimeReactProvider>
    </SessionProvider>
  );
}
