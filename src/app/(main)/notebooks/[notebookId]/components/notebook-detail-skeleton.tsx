import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DocumentCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[70%]" />
        </CardTitle>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between items-center text-sm">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-8 w-[60px]" />
      </CardFooter>
    </Card>
  );
}

export function DocumentListSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 border rounded-lg p-4">
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <Skeleton className="h-5 w-[50%]" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
      <div className="flex items-center gap-6">
        <Skeleton className="h-4 w-[100px] hidden md:block" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export default function NotebookDetailSkeleton({
  view = "grid",
}: {
  view?: "grid" | "list";
}) {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Grid/List Skeleton */}
      <div
        className={cn(
          "gap-4",
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col overflow-hidden"
        )}
      >
        {Array.from({ length: 6 }).map((_, i) =>
          view === "grid" ? (
            <DocumentCardSkeleton key={i} />
          ) : (
            <DocumentListSkeleton key={i} />
          )
        )}
      </div>
    </div>
  );
}
