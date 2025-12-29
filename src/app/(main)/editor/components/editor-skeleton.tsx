import { Skeleton } from "@/components/ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Main content skeleton */}
      <div className="flex h-[calc(100vh-200px)] gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-64 border rounded-lg p-4 space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="flex-1 border rounded-lg p-8 space-y-6">
          <Skeleton className="h-10 w-[40%]" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
