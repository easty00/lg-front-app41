import { Tag } from "lucide-react";
import ErrorMessage from "../atoms/ErrorMessage";
import FieldLabel from "../atoms/FieldLabel";
import AuthHeading from "../molecules/AuthHeading";
import FormField from "../molecules/FormField";
import SignupStepActions from "../molecules/SignupStepActions";
import { skipSignupInterests, submitSignupInterests } from "@/actions/userActions";

export default function SignupInterestsForm({
  interests,
  errors,
}: {
  interests: string;
  errors: { interests?: string; form?: string };
}) {
  return (
    <SignupStepActions
      backStep={2}
      skipAction={skipSignupInterests}
      submitAction={submitSignupInterests}
      submitLabel="다음"
      submitPendingLabel="확인 중"
    >
      <AuthHeading
        TitleType="h2"
        title="관심사를 알려주세요."
        description="관심사는 선택입니다. 쉼표로 여러 개를 적을 수 있고, 건너뛸 수 있습니다."
      />
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="interests">관심사</FieldLabel>
        <FormField
          id="interests"
          type="text"
          name="interests"
          placeholder="예: 클라우드, 데이터, 보안"
          defaultValue={interests}
          error={errors.interests}
          icon={<Tag className="size-5" />}
          isClearable
          required={false}
          autoComplete="off"
        />
      </div>
      <ErrorMessage id="signup-error" error={errors.form} />
    </SignupStepActions>
  );
}
