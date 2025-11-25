// app/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordInner from "./ResetPasswordInner";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}