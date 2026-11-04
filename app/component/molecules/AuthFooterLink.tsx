import Link from "next/link";

export default function AuthFooterLink({
  text,
  href,
  linkText,
}: {
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <p className="flex min-h-9 items-center justify-center gap-2 text-[13px] text-sea-ink card:min-h-11 card:text-sea-muted">
      {text}
      <Link href={href} className="font-bold text-sea-darker underline card:text-sea-deep">
        {linkText}
      </Link>
    </p>
  );
}
