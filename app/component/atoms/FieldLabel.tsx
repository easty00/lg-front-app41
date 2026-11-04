export default function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="sr-only text-sm font-medium text-sea-ink card:not-sr-only full:text-[15px]">
      {children}
    </label>
  );
}
