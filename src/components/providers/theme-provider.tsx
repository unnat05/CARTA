'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  // The mount state is used to avoid SSR/client hydration mismatch for theme rendering.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent any SSR rendering to avoid script injection
  if (!mounted) {
    return <>{children}</>;
  }

  // Force storageKey to prevent script injection
  return (
    <NextThemesProvider 
      {...props}
      storageKey="carta-theme"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
