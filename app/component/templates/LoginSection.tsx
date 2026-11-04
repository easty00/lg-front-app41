"use client";

import { useSearchParams } from "next/navigation";
import { authRoutes } from "@/config/auth";
import { safeCallbackPath } from "@/config/initial";
import { loginErrorMessage } from "@/schema/loginSchema";
import AuthBackLink from "../atoms/AuthBackLink";
import AuthFooterLink from "../molecules/AuthFooterLink";
import AuthHeading from "../molecules/AuthHeading";
import LoginForm from "../organisms/LoginForm";
import KakaoLoginButton from "../molecules/KakaoLoginButton";
import GoogleLoginButton from "../molecules/GoogleLoginButton";
import AuthPanel from "./AuthPanel";
import AuthSlide from "./AuthSlide";

export default function LoginSection() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackPath(searchParams.get("callbackUrl"));
  const loginError = loginErrorMessage(searchParams.get("error"));

  return (
    <AuthPanel>
      <AuthBackLink href={authRoutes.home} />
      <AuthSlide className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col gap-3 card:gap-4 full:gap-5.5" aria-label="로그인">
          <AuthHeading
            TitleType="h1"
            title="Welcome back"
            description="로그인하고 나만의 여정을 이어가세요."
            titleClassName="font-semibold"
            descriptionClassName="hidden card:block"
          />
          <LoginForm callbackUrl={callbackUrl} loginError={loginError} />
          <div className="flex items-center gap-3 text-xs text-sea-ink before:h-px before:flex-1 before:bg-sea-line after:h-px after:flex-1 after:bg-sea-line card:text-sea-muted">
            또는 간편 로그인
          </div>
          <div className="flex justify-center gap-3.5 card:flex-col card:gap-2.5">
            <KakaoLoginButton callbackUrl={callbackUrl} />
            <GoogleLoginButton callbackUrl={callbackUrl} />
          </div>
          <AuthFooterLink text="아직 계정이 없으신가요?" href={authRoutes.signup} linkText="회원가입" />
        </section>
      </AuthSlide>
    </AuthPanel>
  );
}
