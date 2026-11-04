"use client";

import { useAuthSlide } from "@/app/component/providers/AuthSlideProvider";
import { authSlideClass, authVisuals } from "@/config/auth";
import AuthVisual from "./AuthVisual";

export default function AuthRouteVisual() {
  const { order, direction } = useAuthSlide();

  return (
    <AuthVisual
      {...authVisuals[order]}
      textKey={order}
      textClassName={direction ? authSlideClass[direction] : ""}
    />
  );
}
