import { Suspense } from "react";
import ProjectsList from "./components/projects-list";
import ProjectsSkeleton from "./components/projects-skeleton";

import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("project-view")?.value as "grid" | "list") || "grid";

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<ProjectsSkeleton view={initialView} />}>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
