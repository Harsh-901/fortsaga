"use client"

import { Button } from "@/components/ui/button"
import { Shield, Settings } from "lucide-react"
import Link from "next/link"
import { useUser, useSupabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export function Header({
  title = "FortSaga",
  subtitle = "Heritage Conservation",
  showNavigation = true,
  userInfo = null,
  actions = null,
}) {
  const { user, loading } = useUser();
  const supabase = useSupabase();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.id)
            .single();
          setUserRole(profile?.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [user, supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* User Info Section */}
            {user && userRole && (
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            )}

            {/* Navigation Links */}
            {showNavigation && (
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/forts" className="text-foreground hover:text-primary transition-colors">
                  Explore Forts
                </Link>
                <Link href="/reports" className="text-foreground hover:text-primary transition-colors">
                  Report Issues
                </Link>
                <Link href="/learn" className="text-foreground hover:text-primary transition-colors">
                  Learn
                </Link>
              </nav>
            )}

            {/* Custom Actions */}
            {actions || (
              user ? (
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Link href="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export function AdminHeader() {
  const supabase = useSupabase();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Header
      title="FortSaga Admin"
      subtitle="Heritage Management"
      showNavigation={false}
      actions={
        <div className="flex items-center gap-4">
          {/* <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button> */}
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      }
    />
  )
}

export function CitizenHeader({ userInfo }) {
  const supabase = useSupabase();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Header
      title="FortSaga"
      subtitle="Citizen Portal"
      showNavigation={false}
      userInfo={userInfo || {
        name: "Amit Sharma",
        role: "Heritage Contributor",
      }}
      actions={
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      }
    />
  )
}

export function FortExplorerHeader() {
  return <Header title="FortSaga" subtitle="Fort Explorer" showNavigation={true} />
}

export function LearningHeader() {
  return <Header title="FortSaga" subtitle="Learning Center" showNavigation={true} />
}
