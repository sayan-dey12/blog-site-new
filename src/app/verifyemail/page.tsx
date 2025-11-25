import { Suspense } from 'react';
import VerifyEmailInner from './VerifyEmailInner';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>}>
      <VerifyEmailInner />
    </Suspense>
  );
}
