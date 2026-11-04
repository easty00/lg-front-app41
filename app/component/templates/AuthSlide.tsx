"use client";

import { useAuthSlide } from "@/app/component/providers/AuthSlideProvider";
import { authSlideClass } from "@/config/auth";
import { cn } from "@/lib/utils";

export default function AuthSlide({ className, children }: { className?: string; children: React.ReactNode }) {
  const { order, direction, finishSlide } = useAuthSlide();

  return (
    <div
      key={order}
      className={cn(className, direction ? authSlideClass[direction] : undefined)}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) finishSlide();
      }}
    >
      {children}
    </div>
  );
}
