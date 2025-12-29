import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function NotebookCardSkeleton() {
  return (
    <Card className="pt-0 min-h-[375px]">
      <AspectRatio ratio={16 / 7}>
        <Skeleton className="h-full w-full rounded-t-lg" />
      </AspectRatio>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[60%]" />
        </CardTitle>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-8 w-[60px]" />
      </CardFooter>
    </Card>
  );
}

export function NotebookListSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <Skeleton className="h-5 w-[40%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
      <div className="flex items-center gap-6">
        <Skeleton className="h-4 w-[80px] hidden md:block" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export default function NotebooksSkeleton({
  view = "grid",
}: {
  view?: "grid" | "list";
}) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {Array.from({ length: 6 }).map((_, i) =>
        view === "grid" ? (
          <NotebookCardSkeleton key={i} />
        ) : (
          <NotebookListSkeleton key={i} />
        )
      )}
    </div>
  );
}
