"use client";

import { useSearchParams } from "next/navigation";

const STEPS = [
  { id: 1, label: "아이디" },
  { id: 2, label: "비밀번호" },
  { id: 3, label: "관심사" },
  { id: 4, label: "프로필" },
] as const;

export default function SignupProgress() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("step");
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  const stepNumber = parsed === 2 || parsed === 3 || parsed === 4 ? parsed : 1;
  return (
    <ol className="grid grid-cols-4 gap-1.5" aria-label="회원가입 4단계">
      {STEPS.map((item) => {
        const active = item.id === stepNumber;
        const done = item.id < stepNumber;
        return (
          <li
            key={item.id}
            className="flex flex-col gap-1.5"
            aria-current={active ? "step" : undefined}
          >
            <span className={`h-1.25 rounded-full ${active || done ? "bg-sea-deep" : "bg-sea-line"}`} />
            <span className={`text-xs full:text-sm ${active ? "font-bold text-sea-ink" : "text-sea-ink card:text-sea-muted"}`}>
              {item.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
