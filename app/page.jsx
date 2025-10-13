"use client";

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { useUser } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Shield, Users, MapPin, Camera, BookOpen, Award, ChevronRight, Star, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useUser();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const { createBrowserClient } = await import('@supabase/ssr');
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          );
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          setUserRole(profile?.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const getHeaderActions = () => {
    if (user && userRole) {
      if (userRole === 'admin') {
        return {
          userInfo: { name: user.email, role: 'Administrator' },
          actions: (
            <div className="flex items-center gap-4">
              {/* <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button> */}
              <Button variant="outline" size="sm" onClick={async () => {
                try {
                  const { createBrowserClient } = await import('@supabase/ssr');
                  const supabase = createBrowserClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  );
                  await supabase.auth.signOut();
                  window.location.href = '/';
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}>
                Sign Out
              </Button>
            </div>
          )
        };
      } else if (userRole === 'citizen') {
        return {
          userInfo: { name: user.email, role: 'Heritage Contributor' },
          actions: (
            <Button variant="outline" size="sm" onClick={async () => {
              try {
                const { createBrowserClient } = await import('@supabase/ssr');
                const supabase = createBrowserClient(
                  process.env.NEXT_PUBLIC_SUPABASE_URL,
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                );
                await supabase.auth.signOut();
                window.location.href = '/';
              } catch (error) {
                console.error('Error signing out:', error);
              }
            }}>
              Sign Out
            </Button>
          )
        };
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header {...getHeaderActions()} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-accent text-accent-foreground">
            Preserving Chhatrapati Shivaji Maharaj's Legacy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Safeguarding Our
            <span className="text-primary"> Historic Forts</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Join the mission to preserve and protect the magnificent forts of Chhatrapati Shivaji Maharaj. Report
            issues, explore history, and contribute to heritage conservation.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/forts">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Exploring
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/reports">
                <Button size="lg" variant="outline">
                  Report an Issue
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Take Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <Link href="/scanner" className="w-full flex justify-center">
              <Button size="lg" variant="secondary" className="mt-2 w-full sm:w-auto">
                Open Scanner
              </Button>
            </Link>
          </div>          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">350+</div>
              <div className="text-muted-foreground">Historic Forts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12K+</div>
              <div className="text-muted-foreground">Reports Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25K+</div>
              <div className="text-muted-foreground">Active Citizens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive Heritage Management</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Our platform provides everything needed to preserve and celebrate our historic forts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Issue Reporting</CardTitle>
                <CardDescription>
                  Easily report maintenance issues, damage, or safety concerns with photo documentation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground">Fort Explorer</CardTitle>
                <CardDescription>
                  Discover detailed information about each fort including history, architecture, and visitor guides
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Educational Content</CardTitle>
                <CardDescription>
                  Learn about the rich history and cultural significance of Chhatrapati Shivaji Maharaj's forts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground">Community Engagement</CardTitle>
                <CardDescription>
                  Connect with fellow heritage enthusiasts and contribute to conservation efforts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor conservation progress and see the impact of community contributions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground">Recognition System</CardTitle>
                <CardDescription>
                  Earn badges and recognition for your contributions to heritage preservation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-foreground mb-4">For Administrators</CardTitle>
              <CardDescription className="mb-6">
                Manage fort profiles, oversee reports, and coordinate conservation efforts
              </CardDescription>
              <Link href="/admin">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Admin Dashboard
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-8 border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-foreground mb-4">For Citizens</CardTitle>
              <CardDescription className="mb-6">
                Report issues, track progress, and contribute to heritage preservation
              </CardDescription>
              <Link href="/citizen">
                <Button className="w-full bg-transparent" variant="outline">
                  Join as Citizen
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-8 border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-foreground mb-4">For Visitors</CardTitle>
              <CardDescription className="mb-6">
                Explore fort history, plan visits, and learn about our heritage
              </CardDescription>
              <Link href="/forts">
                <Button className="w-full bg-transparent" variant="outline">
                  Start Exploring
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
