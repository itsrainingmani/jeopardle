import { Skeleton } from "./ui/skeleton";

export function LoadingClue() {
  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
