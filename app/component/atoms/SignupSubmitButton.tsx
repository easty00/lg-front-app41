"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SignupFormAction = (formData: FormData) => void | Promise<void>;

export default function SignupSubmitButton({
  label,
  pendingLabel,
  ariaLabel,
  variant = "default",
  action,
  name,
  value,
  className,
}: {
  label: ReactNode;
  pendingLabel: ReactNode;
  ariaLabel?: string;
  variant?: "default" | "outline" | "ghost";
  action: SignupFormAction;
  name?: string;
  value?: string;
  className?: string;
}) {
  const status = useFormStatus();
  const pending = status.pending && status.action === action;

  return (
    <button
      type="submit"
      formAction={action}
      name={name}
      value={value}
      disabled={status.pending}
      aria-busy={pending}
      aria-label={ariaLabel}
      className={cn(buttonVariants({ variant }), className)}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
