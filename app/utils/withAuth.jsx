"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedPage(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token) {
        router.push("/auth");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-muted-foreground">Checking access...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
