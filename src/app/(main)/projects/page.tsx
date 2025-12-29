import { getProjects } from "@/app/server-actions/projects";
import CreateProject from "./dialogs/create-project";
import ProjectCard from "./components/project-card";

export default async function Page() {
  const { data: projects } = await getProjects();

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

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center animate-in fade-in-50">
          <div className="rounded-full bg-accent/20 p-4 mb-4">
            {/* Use a simple svg or icon here if needed, or just text */}
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
            Create your first project to start organizing your documents and
            using AI tools.
          </p>
          <CreateProject />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
