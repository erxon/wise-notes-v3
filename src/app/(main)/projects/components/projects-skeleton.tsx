import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[60%]" />
        </CardTitle>
        <CardDescription className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between items-center text-sm">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-8 w-[60px]" />
      </CardFooter>
    </Card>
  );
}

export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
