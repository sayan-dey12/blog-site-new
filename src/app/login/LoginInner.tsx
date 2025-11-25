"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginInner() {
  const { setLoggedIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      toast.success("✅ Logged in successfully!");
      setLoggedIn(true); // ✅ Update global auth state

      router.push("/blog/submit"); // ✅ Go to protected page
    } catch (error: any) {
      const msg = error.response?.data?.message;

      if (msg === "UNVERIFIED_EMAIL") {
        toast.error("❌ Please verify your email first");
      } else if (msg === "Invalid email or password") {
        toast.error("❌ Wrong email or password");
      } else {
        toast.error("❌ Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="login-form" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            form="login-form"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>

          <Link href="/signup" className="text-sm underline text-center">
            Don't have an account? Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}