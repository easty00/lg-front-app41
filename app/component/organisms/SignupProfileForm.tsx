import ErrorMessage from "../atoms/ErrorMessage";
import AuthHeading from "../molecules/AuthHeading";
import SignupPhotoInput from "../molecules/SignupPhotoInput";
import SignupStepActions from "../molecules/SignupStepActions";
import { skipSignupProfile, submitSignupProfile } from "@/actions/userActions";

export default function SignupProfileForm({
  errors,
}: {
  errors: { profileImageUrl?: string; form?: string };
}) {
  return (
    <SignupStepActions
      backStep={3}
      skipAction={skipSignupProfile}
      skipPendingLabel="가입 중"
      submitAction={submitSignupProfile}
      submitLabel="가입하기"
      submitPendingLabel="가입 중"
    >
      <AuthHeading
        TitleType="h2"
        title="프로필 사진을 올려주세요."
        description="프로필 사진은 선택입니다. 건너뛰면 사진 없이 가입합니다."
      />
      <SignupPhotoInput error={errors.profileImageUrl} />
      <ErrorMessage id="signup-error" error={errors.form} />
    </SignupStepActions>
  );
}
