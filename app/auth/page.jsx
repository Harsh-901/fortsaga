"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const supabase = useSupabase();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // LOGIN with Supabase Auth

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      // fetch profile for role with retry logic
      let profile = null;
      let retries = 3;
      while (retries > 0 && !profile) {
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();
          profile = profileData;
        } catch (err) {
          console.warn(`Profile fetch attempt failed, retries left: ${retries - 1}`);
          retries--;
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
          }
        }
      }

      if (!profile) {
        throw new Error("Failed to load user profile. Please try again.");
      }

      alert("✅ Logged in successfully!");
      console.log("Profile fetched:", profile);
      console.log("Redirecting to role:", profile.role);

      // Role-based redirect
      if (profile.role === "admin") {
        console.log("Redirecting to /admin");
        router.push("/admin");
        return;
      } else if (profile.role === "citizen") {
        console.log("Redirecting to /citizen");
        router.push("/citizen");
        return;
      } else if (profile.role === "visitor") {
        console.log("Redirecting to /forts");
        router.push("/forts");
        return;
      } else {
        console.log("Redirecting to /");
        router.push("/");
        return;
      }
    } catch (err) {
      console.error("❌ Login error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // REGISTER with Supabase Auth
  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      // Create user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
      });
      if (error) throw error;

      // Store profile with role - add retry logic for foreign key constraint
      const userId = data.user.id;
      let profileError = null;
      let retries = 5;

      while (retries > 0) {
        try {
          const { error: insertError } = await supabase.from("profiles").insert([
            {
              id: userId,
              full_name: registerData.name,
              role: registerData.role || "citizen",
            },
          ]);
          if (!insertError) {
            profileError = null;
            break;
          }
          profileError = insertError;
        } catch (err) {
          profileError = err;
        }

        retries--;
        if (retries > 0) {
          console.log(`Profile creation failed, retrying... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        }
      }

      if (profileError) throw profileError;

      alert("✅ Account created! Please check your email to verify.");
    } catch (err) {
      console.error("❌ Registration error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">FortSaga</h1>
              <p className="text-sm text-muted-foreground">
                Heritage Conservation
              </p>
            </div>
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN FORM */}
          <TabsContent value="login">
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-foreground">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your FortSaga account to continue your heritage
                  conservation journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="bg-input border-border pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="register">
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-foreground">Join FortSaga</CardTitle>
                <CardDescription>
                  Create your account and start contributing to heritage
                  conservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role">Role</Label>
                    <Select
                      onValueChange={(value) =>
                        setRegisterData({ ...registerData, role: value })
                      }
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizen">Citizen</SelectItem>
                        <SelectItem value="visitor">Visitor</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            By signing up, you agree to help preserve our heritage and follow
            our community guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
