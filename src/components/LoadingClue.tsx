import { Skeleton } from "./ui/skeleton";

export function LoadingClue() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-48 md:h-64 w-full max-w-xl mx-auto rounded-xl" />
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div> */}
    </div>
  );
}
