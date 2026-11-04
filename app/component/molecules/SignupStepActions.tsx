import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import AuthBackLink from "../atoms/AuthBackLink";
import { authOutlineButton, authPrimaryButton } from "../atoms/authButtonStyles";
import SignupSubmitButton from "../atoms/SignupSubmitButton";
import { backSignupStep } from "@/actions/userActions";
import AuthSlide from "../templates/AuthSlide";
import { authRoutes } from "@/config/auth";

type SignupFormAction = (formData: FormData) => void | Promise<void>;

export default function SignupStepActions({
  backStep,
  skipAction,
  skipPendingLabel = "이동 중",
  submitAction,
  submitLabel,
  submitPendingLabel,
  children,
}: {
  backStep?: 1 | 2 | 3;
  skipAction?: SignupFormAction;
  skipPendingLabel?: string;
  submitAction: SignupFormAction;
  submitLabel: string;
  submitPendingLabel: string;
  children: ReactNode;
}) {
  return (
    <form action={submitAction} noValidate className="flex flex-col card:flex-1">
      <AuthSlide className="flex flex-col gap-3 card:flex-1 card:gap-4 full:gap-5.5">
        {children}
        <div className="flex gap-2.5 card:mt-auto">
          <SignupSubmitButton
            action={submitAction}
            label={submitLabel}
            pendingLabel={submitPendingLabel}
            className={`order-3 flex-1 ${authPrimaryButton}`}
          />
          {backStep ? (
            <SignupSubmitButton
              action={backSignupStep}
              label="이전"
              pendingLabel="이동 중"
              variant="outline"
              className={`order-1 hidden card:inline-flex ${authOutlineButton}`}
            />
          ) : null}
          {skipAction ? (
            <SignupSubmitButton
              action={skipAction}
              label="건너뛰기"
              pendingLabel={skipPendingLabel}
              variant="outline"
              className={`order-2 ${authOutlineButton}`}
            />
          ) : null}
        </div>
      </AuthSlide>
      {backStep ? <input type="hidden" name="backStep" value={String(backStep)} /> : null}
      {backStep ? (
        <SignupSubmitButton
          action={backSignupStep}
          label={<ArrowLeft className="size-6" aria-hidden="true" />}
          pendingLabel={<ArrowLeft className="size-6" aria-hidden="true" />}
          ariaLabel="뒤로 가기"
          variant="ghost"
          className="absolute top-2 left-2.5 size-11 text-sea-ink card:hidden"
        />
      ) : (
        <AuthBackLink href={authRoutes.login} />
      )}
    </form>
  );
}
