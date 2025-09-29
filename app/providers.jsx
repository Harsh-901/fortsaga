"use client";

import { createBrowserClient } from '@supabase/ssr';

export default function Providers({ children }) {
  return (
    <>
      {children}
    </>
  );
}
