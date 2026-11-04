"use client";

import { createContext, useContext, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { authOrderOf, type AuthOrder, type AuthSlideDirection } from "@/config/auth";

type AuthSlideValue = {
  order: AuthOrder;
  direction: AuthSlideDirection | null;
  finishSlide: () => void;
};

const AuthSlideContext = createContext<AuthSlideValue>({ order: 0, direction: null, finishSlide: () => {} });

export function AuthSlideProvider({ children }: { children: React.ReactNode }) {
  const order = authOrderOf(usePathname(), useSearchParams().get("step"));
  const [previousOrder, setPreviousOrder] = useState(order);
  const [direction, setDirection] = useState<AuthSlideDirection | null>(null);

  if (order !== previousOrder) {
    setPreviousOrder(order);
    setDirection(order > previousOrder ? "forward" : "back");
  }

  // 서버 액션의 redirect로 폼이 다시 그려져도 같은 슬라이드가 반복되지 않도록 재생 후 지운다
  const finishSlide = () => setDirection(null);

  return <AuthSlideContext.Provider value={{ order, direction, finishSlide }}>{children}</AuthSlideContext.Provider>;
}

export function useAuthSlide() {
  return useContext(AuthSlideContext);
}
