"use client";
import SignupFields from "../organisms/SignupFields";

export default function SignupSection() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-8 relative h-screen">
      <h2 id="signup-title" className="text-xl font-semibold">
        회원가입
      </h2>
      <SignupFields />
    </section>
  );
}
