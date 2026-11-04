import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SignupFallback({ className }: { className?: string }) {
  return (
    <section className={cn("relative mx-auto flex h-screen w-full max-w-md flex-col gap-2 px-4 py-8", className)} aria-busy="true">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </section>
  );
}