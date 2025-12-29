'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// Username normalization: single word, URL-safe
const normalizeUsername = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9_]/g, '');

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setForm((prev) => ({
        ...prev,
        username: normalizeUsername(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --------------------
    // Client-side checks
    // --------------------
    if (!form.username || !form.name || !form.email || !form.password) {
      toast.error('All fields are required');
      return;
    }

    if (/\s/.test(form.username)) {
      toast.error('Username must be a single word (no spaces)');
      return;
    }

    if (!/^[a-z0-9_]+$/.test(form.username)) {
      toast.error(
        'Username can only contain lowercase letters, numbers, and underscores'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/auth/signup', form);

      toast.success(
        res.data?.message ||
          'Account created! Please verify your email.'
      );

      router.push('/login');
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Signup failed. Please try again.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-[420px] shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            id="signup-form"
            className="space-y-4"
          >
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. sayan_dey"
                autoComplete="username"
                required
                pattern="^[a-z0-9_]+$"
              />
              <p className="text-xs text-muted-foreground">
                One word only. Lowercase letters, numbers, underscores.
              </p>
            </div>

            {/* Display Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sayan Dey"
                required
                autoComplete="name"
              />
              <p className="text-xs text-muted-foreground">
                This is your public display name. Spaces allowed.
              </p>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            form="signup-form"
            disabled={loading}
            className="w-full"
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
