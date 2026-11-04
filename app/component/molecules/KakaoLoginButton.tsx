"use client" ;

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { authSocialButton } from "../atoms/authButtonStyles";

export default function KakaoLoginButton({ callbackUrl }: { callbackUrl: string }) {
    const handleKakaoLogin = () => {
        signIn("kakao", {
            redirect: true,
            callbackUrl,
        });
    };
    return (
        <Button
            onClick={handleKakaoLogin}
            variant="outline"
            className={`border-transparent bg-kakao text-kakao-ink hover:bg-kakao/85 hover:text-kakao-ink ${authSocialButton}`}
        >
            <MessageCircle className="size-5 fill-current" aria-hidden="true" />
            <span className="sr-only card:not-sr-only">Kakao Login</span>
        </Button>
    );
}