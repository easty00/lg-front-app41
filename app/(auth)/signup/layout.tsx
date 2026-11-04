import { Suspense } from "react";
import { authRoutes } from "@/config/auth";
import SignupProgress from "@/app/component/molecules/SignupProgress";
import AuthFooterLink from "@/app/component/molecules/AuthFooterLink";
import AuthPanel from "@/app/component/templates/AuthPanel";
import SignupFallback from "@/components/loader/SignupFallback";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthPanel>
      {/* signup header */}
      <SignupProgress />
      <Suspense fallback={<SignupFallback className="h-auto max-w-none p-0" />}>{children}</Suspense>
      {/* signup footer */}
      <AuthFooterLink text="이미 계정이 있으신가요?" href={authRoutes.login} linkText="로그인" />
    </AuthPanel>
  );
}
