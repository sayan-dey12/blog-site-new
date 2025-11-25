// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { duration: 3000 });
      } else {
        toast.error(data.message, { duration: 3000 });
      }
    } catch (error) {
      toast.error('Something went wrong.', { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <div>
          <Label htmlFor="email" className='mb-2'>Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
}