import { Mail, User } from "lucide-react";
import ErrorMessage from "../atoms/ErrorMessage";
import FieldLabel from "../atoms/FieldLabel";
import AuthHeading from "../molecules/AuthHeading";
import FormField from "../molecules/FormField";
import SignupStepActions from "../molecules/SignupStepActions";
import { submitSignupIdentity } from "@/actions/userActions";

export default function SignupIdentityForm({
  userId = "",
  email = "",
  errors = {},
}: {
  userId?: string;
  email?: string;
  errors?: { userId?: string; email?: string; form?: string };
}) {
  return (
    <SignupStepActions submitAction={submitSignupIdentity} submitLabel="다음" submitPendingLabel="확인 중">
      <AuthHeading
        TitleType="h2"
        title="아이디를 입력해주세요."
        description="로그인에 쓸 아이디와 이메일을 알려주세요."
      />
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="userId">아이디</FieldLabel>
        <FormField
          id="userId"
          type="text"
          name="userId"
          placeholder="아이디를 입력해주세요"
          defaultValue={userId}
          error={errors.userId}
          icon={<User className="size-5" />}
          isClearable
          required={false}
          autoComplete="username"
        />
      </div>
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="email">이메일</FieldLabel>
        <FormField
          id="email"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          defaultValue={email}
          error={errors.email}
          icon={<Mail className="size-5" />}
          isClearable
          required={false}
          autoComplete="email"
        />
      </div>
      <ErrorMessage id="signup-identity-error" error={errors.form} />
    </SignupStepActions>
  );
}
