import { Lock } from "lucide-react";
import ErrorMessage from "../atoms/ErrorMessage";
import FieldLabel from "../atoms/FieldLabel";
import AuthHeading from "../molecules/AuthHeading";
import FormField from "../molecules/FormField";
import SignupStepActions from "../molecules/SignupStepActions";
import { submitSignupPassword } from "@/actions/userActions";

export default function SignupPasswordForm({
  password,
  errors,
}: {
  password: string;
  errors: { password?: string; passwordConfirm?: string; form?: string };
}) {
  return (
    <SignupStepActions backStep={1} submitAction={submitSignupPassword} submitLabel="다음" submitPendingLabel="확인 중">
      <AuthHeading TitleType="h2" title="비밀번호를 정해주세요." description="비밀번호는 8자 이상이어야 합니다." />
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="password">비밀번호</FieldLabel>
        <FormField
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          defaultValue={password}
          error={errors.password}
          icon={<Lock className="size-5" />}
          isClearable
          required={false}
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="passwordConfirm">비밀번호 확인</FieldLabel>
        <FormField
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          error={errors.passwordConfirm}
          icon={<Lock className="size-5" />}
          isClearable
          required={false}
          autoComplete="new-password"
        />
      </div>
      <ErrorMessage id="signup-error" error={errors.form} />
    </SignupStepActions>
  );
}
