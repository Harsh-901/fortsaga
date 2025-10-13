// app/admin/layout.jsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/supabase';
import { AdminHeader } from '@/components/shared/header';

export default function AdminLayout({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          router.push('/auth');
          return;
        }

        // Check if user has admin role
        try {
          const { createBrowserClient } = await import('@supabase/ssr');
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          );
          const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

          if (profile?.role === 'admin') {
            setIsAuthorized(true);
          } else {
            router.push('/auth');
          }
        } catch (error) {
          console.error('Error checking admin role:', error);
          router.push('/auth');
        }
      }
    };

    checkAuth();
  }, [user, loading, router]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
