"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createContext, useContext, useState } from "react";

// Create a React context to provide Supabase client
const SupabaseContext = createContext(null);

export const useSupabase = () => useContext(SupabaseContext);

export default function SupabaseProvider({ children }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
