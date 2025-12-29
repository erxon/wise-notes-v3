import CreateProject from "./dialogs/create-project";
import { Suspense } from "react";
import ProjectsList from "./components/projects-list";
import ProjectsSkeleton from "./components/projects-skeleton";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and connected documents.
          </p>
        </div>
        <div className="md:ml-auto">
          <CreateProject />
        </div>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
