import { connection } from "next/server";
import { AuthProvider } from "@/app/component/providers/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"

export default async function AuthShell({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await getServerSession(authOptions);

  return <AuthProvider accessToken={session?.accessToken ?? null}>{children}</AuthProvider>;
}
