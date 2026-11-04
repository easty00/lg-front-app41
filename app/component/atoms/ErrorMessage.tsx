import { cn } from "@/lib/utils";

export default function ErrorMessage({ id, error, className }: { id: string; error?: string; className?: string }) {
    // if (!error) return null;

    return (
        <p className={cn("min-h-[18px] text-xs/[18px] font-medium text-sea-error full:min-h-5 full:text-[13px]/5", className)} id={id} role="alert"
           style={{ transition: "opacity 0.3s ease-in-out", opacity: error ? 1 : 0 }}

        >{error}</p>
    );
}
