import { Suspense } from "react";
import LoginSection from "@/app/component/templates/LoginSection";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginSection />;
    </Suspense>
  );
}
