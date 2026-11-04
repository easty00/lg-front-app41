"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authPrimaryButton } from "../atoms/authButtonStyles";
import FieldLabel from "../atoms/FieldLabel";
import FormField from "../molecules/FormField";
import initialValues from "@/types/initial/loginInitial";
import { UserPayloadType } from "@/types/request/RequestType";
import { emptyErrors } from "@/types/error/loginError";
import loginSchema, { loginFieldMessage } from "@/schema/loginSchema";

type LoginFieldName = keyof UserPayloadType;

function LoginSubmitButton({ isValid, isPending }: { isValid: boolean; isPending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={!isValid || isPending}
      aria-busy={isPending}
      className={`w-full ${authPrimaryButton}`}
    >
      {isPending ? "로그인 중 ..." : "Login"}
    </Button>
  );
}

export default function LoginForm({ callbackUrl, loginError }: { callbackUrl: string; loginError: string }) {
  const [payload, setPayload] = useState(initialValues);
  const [errors, setErrors] = useState(emptyErrors);
  const [formError, setFormError] = useState(loginError);
  const [isPending, startTransition] = useTransition();
  const isValid = loginSchema.safeParse(payload).success;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== "userId" && name !== "password") return;
    const field: LoginFieldName = name;
    setFormError("");
    setPayload((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({
      ...current,
      [field]: loginFieldMessage(field, value),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setFormError("");
    startTransition(async () => {
      await signIn("credentials", {
        email: payload.userId,
        password: payload.password,
        redirect: true,
        callbackUrl,
      });
    });
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 card:gap-2 full:gap-3">
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="userId">아이디</FieldLabel>
        <FormField
          id="userId"
          type="text"
          name="userId"
          placeholder="아이디를 입력해주세요"
          value={payload.userId}
          error={errors.userId}
          invalid={Boolean(formError)}
          icon={<User className="size-5" />}
          isClearable={true}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="password">비밀번호</FieldLabel>
        <FormField
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={payload.password}
          error={errors.password || formError}
          icon={<Lock className="size-5" />}
          isClearable={true}
          onChange={handleChange}
        />
      </div>
      <LoginSubmitButton isValid={isValid} isPending={isPending} />
    </form>
  );
}
