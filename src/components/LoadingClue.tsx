import { Skeleton } from "@/components/ui/skeleton";

export function LoadingClue() {
  return (
    <Skeleton className="h-48 md:h-64 w-full max-w-2xl mx-auto rounded-xl" />
  );
}
