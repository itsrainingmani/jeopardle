import { Skeleton } from "./ui/skeleton";

export function LoadingClue() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-48 md:h-64 w-full max-w-2xl mx-auto rounded-xl" />
    </div>
  );
}
