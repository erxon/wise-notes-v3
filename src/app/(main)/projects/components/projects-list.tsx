import { getProjects } from "@/app/server-actions/projects";
import CreateProject from "../dialogs/create-project";
import ProjectsView from "./projects-view";
import { cookies } from "next/headers";

export default async function ProjectsList() {
  const { data: projects } = await getProjects();
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("project-view")?.value as "grid" | "list") || "grid";

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center animate-in fade-in-50">
        <div className="rounded-full bg-accent/20 p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-accent-foreground"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
        <p className="text-muted-foreground max-w-sm mb-6">
          Create your first project to start organizing your documents and using
          AI tools.
        </p>
        <CreateProject />
      </div>
    );
  }

  return <ProjectsView projects={projects} initialView={initialView} />;
}
