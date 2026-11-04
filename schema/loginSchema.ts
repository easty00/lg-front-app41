import { z } from "zod";
import { UserPayloadType } from "@/types/request/RequestType";

const loginSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해 주세요."),
  password: z.string().min(1, "비밀번호를 입력해 주세요.")
});

type LoginFieldName = keyof UserPayloadType;

function loginFieldMessage(field: LoginFieldName, value: string) {
  const result = loginSchema.shape[field].safeParse(value);
  if (result.success) return "";
  return result.error.issues[0]?.message ?? "";
}

function loginErrorMessage(error: string | null) {
  if (!error) return "";
  if (error === "CredentialsSignin") return "아이디 또는 비밀번호가 올바르지 않습니다.";
  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export { loginErrorMessage, loginFieldMessage };
export default loginSchema;
