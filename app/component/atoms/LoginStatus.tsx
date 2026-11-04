"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/component/providers/AuthProvider";

export default function LoginStatus() {
  const { isLoggedIn } = useAuth();
  const [isPending, startTransition] = useTransition();
  if (!isLoggedIn) return null;

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/" });
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}
