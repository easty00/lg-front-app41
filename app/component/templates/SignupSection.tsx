import SignupIdentityForm from "../organisms/SignupIdentityForm";
import SignupInterestsForm from "../organisms/SignupInterestsForm";
import SignupPasswordForm from "../organisms/SignupPasswordForm";
import SignupProfileForm from "../organisms/SignupProfileForm";
import type { SignupDraft, SignupErrors } from "@/actions/draft";

export default function SignupSection({
  step,
  draft,
  errors,
}: {
  step: number;
  draft: SignupDraft;
  errors: SignupErrors;
}) {
  return (
    <section className="flex flex-col card:flex-1" aria-labelledby="signup-title">
      <h2 id="signup-title" className="sr-only">
        회원가입
      </h2>
      {step === 1 ? <SignupIdentityForm userId={draft.userId} email={draft.email} errors={errors} /> : null}
      {step === 2 ? <SignupPasswordForm password={draft.password} errors={errors} /> : null}
      {step === 3 ? <SignupInterestsForm interests={draft.interestsText} errors={errors} /> : null}
      {step === 4 ? <SignupProfileForm errors={errors} /> : null}
    </section>
  );
}
