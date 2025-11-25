// app/reset-password/ResetPasswordInner.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, id, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { duration: 3000 });
        router.push('/login');
      } else {
        toast.error(data.message, { duration: 3000 });
      }
    } catch {
      toast.error('Something went wrong', { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleReset} className="space-y-6 w-full max-w-sm">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <div>
          <Label className='mb-2'>New Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='new-password'
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}