import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthBackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="뒤로 가기"
      className="absolute top-2 left-2.5 inline-flex size-11 items-center justify-center text-sea-ink card:hidden"
    >
      <ArrowLeft className="size-6" aria-hidden="true" />
    </Link>
  );
}
